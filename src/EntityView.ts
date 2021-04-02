import * as TSU from "@panyam/tsutils";
import { View, ViewParams } from "./View";

declare const ResizeObserver: any;

export class EntityView<EntityType = any> extends View {
  protected _entity: TSU.Nullable<EntityType>;

  constructor(rootElement: Element, entity: TSU.Nullable<EntityType> = null, config?: ViewParams) {
    super(rootElement, config);
    this._entity = entity;
  }

  /**
   * After child elements are created this is an opportunity to
   * add additional bindings for them.
   */
  protected loadChildViews(): void {
    super.loadChildViews();
    this.updateViewsFromEntity();
  }

  get entity(): TSU.Nullable<EntityType> {
    return this._entity;
  }

  set entity(entity: TSU.Nullable<EntityType>) {
    if (entity != this._entity && this.isEntityValid(entity)) {
      const prev = this._entity;
      this._entity = entity;
      this.updateViewsFromEntity(prev);
    }
  }

  /**
   * This method is called to update the entity based on what has
   * been input/entered into the views.  By default it does nothing.
   */
  protected updateEntityFromViews(): TSU.Nullable<EntityType> {
    return this._entity;
  }

  /**
   * Called when the entity has been updated in order to update the views
   * and/or their contents.
   * This method is called with the "previous" entity as the latest
   * entity is already set in this View.  This will help the View
   * reconcile any diffs.
   */
  protected updateViewsFromEntity(_previous: TSU.Nullable<EntityType> = null): void {
    // Do nothing - implement this to update view state from entity
  }

  protected isEntityValid(_entity: TSU.Nullable<EntityType>): boolean {
    return true;
  }

  refreshViews(): void {
    // TODO
  }
}
