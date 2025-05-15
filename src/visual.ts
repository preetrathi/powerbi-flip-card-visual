"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private textNode: Text;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.updateCount = 0;

        if (document) {
            const container = document.createElement("div");
            container.className = "container";

            container.innerHTML = `
                <div class='card front-face'>
                    <header>
                        <h5>Master Card</h5>
                    </header>
                    <div class='card-details'>
                        <div class='name-number'>
                            <h6>Card Number</h6>
                            <h5 class='number'>8050 2030 3020 5040</h5>
                            <h5 class='name'>Preet Kumar</h5>
                        </div>
                        <div class='valid-date'>
                            <h6>Valid Thru</h6>
                            <h5>05/28</h5>
                        </div>
                    </div>
                </div>
                <div class='card back-face'>
                    <header>
                        <h5>Master Card</h5>
                    </header>
                    <div class='card-details'>
                        <div class='name-number'>
                            <h6>Card Number</h6>
                            <h5 class='number'>8050 2030 3020 5040</h5>
                            <h5 class='name'>Preet Kumar</h5>
                        </div>
                        <div class='valid-date'>
                            <h6>Valid Thru</h6>
                            <h5>05/28</h5>
                        </div>
                    </div>
                </div>
            `;

            this.target.appendChild(container);
        }
    } // ✅ Fixed: Closing brace for constructor added here

    public update(options: VisualUpdateOptions) {
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualFormattingSettingsModel,
            options.dataViews[0]
        );

        console.log('Visual update', options);
        if (this.textNode) {
            this.textNode.textContent = (this.updateCount++).toString();
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}
