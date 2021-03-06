import * as TSU from "@panyam/tsutils";
import { View } from "./View";

export const TabClickedEvent = "TabClickedEvent";
export const TabSelectedEvent = "TabSelectedEvent";

export class TabView extends View {
  tabButtonElems: HTMLElement[];
  tabContentElems: HTMLElement[];
  tabButtonClassName: string;
  selectedTabClassName: string;
  unselectedTabClassName: string;
  tabContentClassName: string;
  selectedIndex: number;
  processConfigs(configs: any): any {
    super.processConfigs(configs);
    this.selectedTabClassName = configs.selectedTabClassName || "selected";
    this.tabButtonClassName = configs.tabButtonClassName || "tabButton";
    this.tabContentClassName = configs.tabContentClassName || "tabContent";
    this.tabButtonElems = [];
    this.tabContentElems = [];
    return configs;
  }

  loadChildViews(): void {
    super.loadChildViews();
    this.selectedIndex = -1;
    let nextTabIndex = 0;
    this.findAll("." + this.tabButtonClassName).forEach((node, index) => {
      const elem = node as HTMLElement;
      this.tabButtonElems.push(elem);
      if (elem.classList.contains(this.selectedTabClassName)) {
        nextTabIndex = index;
      }
      elem.addEventListener("click", (evt) => this.onTabButtonClicked(evt));
    });
    this.findAll("." + this.tabContentClassName).forEach((node) => {
      const elem = node as HTMLElement;
      elem.style.display = "none";
      this.tabContentElems.push(elem);
    });
    this.selectTab(nextTabIndex);
  }

  protected onTabButtonClicked(evt: Event): void {
    const target = evt.target;
    for (let i = 0; i < this.tabButtonElems.length; i++) {
      const btn = this.tabButtonElems[i];
      if (btn == target) {
        if (this.eventHub?.emit(TabClickedEvent, this, i)) {
          this.selectTab(i);
        }
        return;
      }
    }
  }

  selectTab(index = 0): void {
    console.log("Selecting Tab: ", index);
    if (this.selectedIndex != index) {
      if (this.selectedIndex >= 0) {
        this.tabButtonElems[this.selectedIndex].classList.remove(this.selectedTabClassName);
        this.tabContentElems[this.selectedIndex].style.display = "none";
      }
      this.selectedIndex = index;
      this.tabButtonElems[this.selectedIndex].classList.add(this.selectedTabClassName);
      this.tabContentElems[this.selectedIndex].style.display = "inline";
      this.eventHub?.emit(TabSelectedEvent, this, index);
    }
  }
}
