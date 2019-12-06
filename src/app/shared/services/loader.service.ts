import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  requestsInPending: BehaviorSubject<number> = new BehaviorSubject(0);

  addRequestsInPending(value: number): void {
    this.requestsInPending.next(this.requestsInPending.value + value);
  }
}
