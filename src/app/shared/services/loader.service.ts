import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  pendingRequests: BehaviorSubject<number> = new BehaviorSubject(0);

  addRequestsInPending(value: number): void {
    this.pendingRequests.next(this.pendingRequests.value + value);
  }
}
