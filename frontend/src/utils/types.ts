export type ServiceFormValues = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  serviceId: number
};

export type CreateServiceFormValues = {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string;
  serviceId: number
};

export type SubscriptionDetailCardProps = {
  sub: ServiceFormValues;
  index: number;
};

export type SubscriptionFormValues = {
  serviceId: string;
  subscriber: string;
  price: string;
  nextPaymentDate: string;
  active: boolean;
  duration: string;
};
