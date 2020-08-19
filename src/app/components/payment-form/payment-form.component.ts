import {environment} from 'src/environments/environment';
import {Address} from 'src/app/model/Address/Address';
import {
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  Component,
  ViewChild,
  OnDestroy,
  Input,
} from '@angular/core';

declare var Stripe; //: stripe.StripeStatic;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.sass'],
})
export class PaymentFormComponent implements OnDestroy, AfterViewInit {
  private stripe: any;
  private card: any;

  @Input() paymentSecret: string;

  @ViewChild('cardInfo') cardInfo: ElementRef<HTMLDivElement>;
  cardComplete: boolean;
  cardError: string;

  // Methods
  private getCardStyle(): any {
    return {
      base: {
        color: '#333333',
        fontFamily: '"Bellota Text", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#cccccc',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
  }

  submitPayment(): Promise<any> {
    if (!this.cardComplete) return;

    const promise = new Promise<any>((resolve, reject) => {
      this.stripe
        .confirmCardPayment(this.paymentSecret, {
          payment_method: {card: this.card},
        })

        .then(payment_result => {
          if (payment_result.error) {
            console.error(payment_result.error.message);
            this.cardError = payment_result.error.message;

            reject({
              error: 'There was an error authorizing your card',
            });
          } else {
            resolve({success: true});
          }
        });
    });

    return promise;
  }

  // Event Handlers
  onCardChange(event: any) {
    this.cardError = event.error ? event.error.message : null;
    this.cardComplete = event.complete;
    this.cd.detectChanges();
  }

  // Lifecycle
  ngAfterViewInit() {
    this.stripe = Stripe(environment.stripe_public_key);
    const elements = this.stripe.elements();
    var style = this.getCardStyle();

    this.card = elements.create('card', {style: style});
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onCardChange.bind(this));
  }

  ngOnDestroy() {
    if (this.card !== undefined) {
      this.card.destroy();
    }
  }

  constructor(private cd: ChangeDetectorRef) {}
}
