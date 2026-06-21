import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() shape: 'circle' | 'rectangle' = 'rectangle';

  getStyles(): { [key: string]: string } {
    return {
      'width': this.width,
      'height': this.height,
      'border-radius': this.shape === 'circle' ? '50%' : 'var(--radius-sm)'
    };
  }
}
