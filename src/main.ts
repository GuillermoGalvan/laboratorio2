type Order = {
  id: string;
  type: string;
  quantity: number;
  amount: number;
  customerEmail: string;
  email: string;
  phone: string;
};

interface IVerify<T> {
  verify(data: T): boolean;
}

interface IProcessPayment {
  process(order: Order): void;
}
interface IInsert<T> {
  insert(entity: T): void;
}

interface IUpdate<T> {
  update(entity: T): void;
}

interface INotifyOrder {
  send(order: Order): void;
}

class OderDBManager implements IInsert<Order>, IUpdate<Order> {
  update(entity: Order): void {
    throw new Error("Method not implemented.");
  }

  insert(entity: Order): void {
    throw new Error("Method not implemented.");
  }
}

class EmailNotificationService implements INotifyOrder {
  send(order: Order): void {
    throw new Error("Method not implemented.");
  }
}

class SMSNotificationService implements INotifyOrder {
  send(order: Order): void {
    throw new Error("Method not implemented.");
  }
}

class InventoryService implements IVerify<Order> {
  private readonly inventory: number;
  // para recueperar el inventari se puede pasar una interfaz que tenga un metodo para recuperar el inventario
  // o se puede pasar el inventario directamente
  // para caso rapido se asigna el inventario directamente
  constructor(inventory: number) {
    this.inventory = inventory;
  }
  verify(data: Order): boolean {
    return this.inventory < data.quantity;
  }
}

class EmailVarificationService implements IVerify<Order> {
  verify(data: Order): boolean {
    return data.email !== "" && data.customerEmail !== "";
  }
}

class PhonevarificationService implements IVerify<Order> {
  verify(data: Order): boolean {
    return data.phone !== "";
  }
}

class PaymentService implements IProcessPayment {
  protected verify: IVerify<Order>[];
  protected readonly notificationService: INotifyOrder[];
  protected readonly oderDBManager: OderDBManager;

  constructor(verify: IVerify<Order>[], notificationService: INotifyOrder[]) {
    this.notificationService = notificationService;
    this.verify = verify;
    this.oderDBManager = new OderDBManager();
  }

  process(order: Order): void {
    if (!this.verifyInventory(order)) {
      throw new Error("Payment failed");
    }

    this.continueProcess(order);
    this.oderDBManager.update(order);
    this.notify(order);
  }

  protected verifyInventory(order: Order): boolean {
    return this.verify.every((v) => v.verify(order));
  }

  protected notify(order: Order) {
    this.notificationService.forEach((service) => service.send(order));
  }

  protected continueProcess(order: Order): void {
    this.oderDBManager.insert(order);
  }
}

class ProcessStandardPayment extends PaymentService implements IProcessPayment {
  constructor() {
    super(
      [
        new InventoryService(100),
        new EmailVarificationService(),
        new PhonevarificationService(),
      ],
      [new EmailNotificationService(), new SMSNotificationService()]
    );
  }
  override continueProcess(order: Order): void {
    this.processPayment(order.amount);
    this.oderDBManager.insert(order);
  }

  processPayment(amount: number): void {}
}

class ProcessExpressPayment extends PaymentService implements IProcessPayment {
  private readonly priority: string;
  constructor(priority: string) {
    super(
      [new InventoryService(100), new PhonevarificationService()],
      [new SMSNotificationService()]
    );
    this.priority = priority;
  }

  override continueProcess(order: Order): void {
    this.processPayment(order.amount, this.priority);
    this.oderDBManager.insert(order);
  }

  protected processPayment(amount: number, priority: any): void {}
}

class SystemManager {
  processOrder(order) {
    let processPayment: IProcessPayment | null = null;

    switch (order.type) {
      case "standard":
        processPayment = new ProcessStandardPayment();
        break;
      case "express":
        processPayment = new ProcessExpressPayment("highPriority");
        break;

      default:
        throw new Error("Payment failed");
    }

    processPayment?.process(order);
  }
}
