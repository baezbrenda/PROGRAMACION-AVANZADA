import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import Stripe from 'stripe';
import { PaymentsService } from './payments.service';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  async createPaymentSession(
    @Body() dto: CreatePaymentSessionDto,
  ): Promise<Stripe.Checkout.Session> {
    return this.paymentsService.createPaymentSession(dto);
  }

  @Get('success')
  success() {
    return { ok: true, message: 'Payment successful' };
  }

  @Get('cancel')
  cancel() {
    return { ok: false, message: 'Payment cancelled' };
  }

  @Post('webhook')
  @HttpCode(200)
  handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      event = this.paymentsService.constructWebhookEvent(
        req.rawBody as Buffer,
        signature,
      );
    } catch (err) {
      throw new BadRequestException(
        `Webhook Error: ${(err as Error).message}`,
      );
    }

    this.paymentsService.handleWebhookEvent(event);
    return { received: true };
  }
}