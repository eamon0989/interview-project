import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { BatchesService } from './batch.service';
import { Subject, map, takeUntil } from 'rxjs';
import { SubBatchesTableComponent } from './subbatches-table.component';

@Component({
    selector: 'app-subbatches',
    imports: [SubBatchesTableComponent],
    template: ` @if (this.subbatches()) {
   <app-subbatches-table [batches]="this.subbatches()"></app-subbatches-table>
 }`,
    styles: ``
})
export class SubbatchesComponent implements OnInit, OnDestroy {
  private readonly batchService = inject(BatchesService);
  private destroy$ = new Subject<void>();
  // TODO: make component state
  readonly batch = this.batchService.batch;
  readonly subbatches = this.batchService.subbatches;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params: ParamMap) => {
          const id = params.get('batchId');
          if (id) this.batchService.getBatch(id);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
