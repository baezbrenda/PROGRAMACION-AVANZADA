import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET as string);
  }

  async createPaymentSession(
    dto: CreatePaymentSessionDto,
  ): Promise<Stripe.Checkout.Session> {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      currency: dto.currency,
      line_items: dto.items.map((item) => ({
        price_data: {
          currency: dto.currency,
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      payment_intent_data: {
        metadata: { orderId: dto.orderId },
      },
      success_url: process.env.STRIPE_SUCCESS_URL as string,
      cancel_url: process.env.STRIPE_CANCEL_URL as string,
    });

    return session;
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_ENDPOINT_SECRET as string,
    );
  }

  handleWebhookEvent(event: Stripe.Event): void {
    switch (event.type) {
      case 'charge.succeeded': {
        const charge = event.data.object as Stripe.Charge;
        const orderId = charge.metadata?.orderId;
        console.log(`Pago confirmado para orderId: ${orderId}`);
        break;
      }
      default:
        console.log(`Evento no manejado: ${event.type}`);
    }
  }
}