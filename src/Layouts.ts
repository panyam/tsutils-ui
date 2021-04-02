import * as TSU from "@panyam/tsutils";
import { Size } from "./core";

interface View {
  parentView: TSU.Nullable<View>;
}

/**
 * An implementation of the java style Layout managers
 */
export interface LayoutManager {
  /**
   * Add a view to being laid out us.
   */
  addView(view: View, layoutConstraints: any): void;

  /**
   * Remove a view from being managed by us.
   */
  removeView(view: View): void;

  /**
   * Returns the min size of a view whose is layout is being managed by us.
   */
  minLayoutSize(parentView: View): Size;

  /**
   * Returns the max size of a view whose is layout is being managed by us.
   */
  maxLayoutSize(parentView: View): Size;

  /**
   * Returns the pref size of a view whose is layout is being managed by us.
   */
  prefLayoutSize(parentView: View): Size;

  /**
   * Returns the alignment along the x axis.  This specifies how
   * the component would like to be aligned relative to other
   * components.  The value should be a number between 0 and 1
   * where 0 represents alignment along the origin, 1 is aligned
   * the furthest away from the origin, 0.5 is centered, etc.
   */
  layoutAlignmentX(parentView: View): number;

  /**
   * Returns the alignment along the y axis.  This specifies how
   * the component would like to be aligned relative to other
   * components.  The value should be a number between 0 and 1
   * where 0 represents alignment along the origin, 1 is aligned
   * the furthest away from the origin, 0.5 is centered, etc.
   */
  layoutAlignmentY(parentView: View): number;

  /**
   * Lays out the view and all its children.
   */
  layoutChildViews(parentView: View): void;

  /**
   * Called to notify that layout info on the view is no longer
   * valid.
   */
  invalidateLayout(parentView: TSU.Nullable<View>): void;
}

export class DefaultLayoutManager implements LayoutManager {
  /**
   * Add a view to being laid out us.
   */
  addView(view: View, layoutConstraints: any): void {
    this.invalidateLayout(view.parentView);
  }

  /**
   * Remove a view from being managed by us.
   */
  removeView(view: View): void {
    this.invalidateLayout(view.parentView);
  }

  /**
   * Returns the min size of a view whose is layout is being managed by us.
   */
  minLayoutSize(parentView: View): Size {
    return new Size();
  }

  /**
   * Returns the max size of a view whose is layout is being managed by us.
   */
  maxLayoutSize(parentView: View): Size {
    return new Size(TSU.Constants.MAX_INT, TSU.Constants.MAX_INT);
  }

  /**
   * Returns the pref size of a view whose is layout is being managed by us.
   */
  prefLayoutSize(parentView: View): Size {
    return new Size();
  }

  /**
   * Returns the alignment along the x axis.  This specifies how
   * the component would like to be aligned relative to other
   * components.  The value should be a number between 0 and 1
   * where 0 represents alignment along the origin, 1 is aligned
   * the furthest away from the origin, 0.5 is centered, etc.
   */
  layoutAlignmentX(parentView: View): number {
    return 0;
  }

  /**
   * Returns the alignment along the y axis.  This specifies how
   * the component would like to be aligned relative to other
   * components.  The value should be a number between 0 and 1
   * where 0 represents alignment along the origin, 1 is aligned
   * the furthest away from the origin, 0.5 is centered, etc.
   */
  layoutAlignmentY(parentView: View): number {
    return 0;
  }

  /**
   * Lays out the view and all its children.
   */
  layoutChildViews(parentView: View): void {
    //
  }

  invalidateLayout(parentView: TSU.Nullable<View>): void {
    this.validateContainer(parentView);
  }

  protected validateContainer(target: TSU.Nullable<View>): void {
    // Nothing
  }
}
