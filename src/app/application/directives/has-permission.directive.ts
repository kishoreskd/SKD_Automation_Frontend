import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective implements OnInit {

  constructor(private _templateRef: TemplateRef<any>, private _viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    this._viewContainer.createEmbeddedView(this._templateRef);
    // this._viewContainer.clear();
  }

}
