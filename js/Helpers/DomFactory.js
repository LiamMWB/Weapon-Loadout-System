"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var WeaponLoadoutSystem;
(function (WeaponLoadoutSystem) {
    function createElement(tag, classNames, innerText) {
        var _a;
        if (classNames === void 0) { classNames = []; }
        if (innerText === void 0) { innerText = ""; }
        var element = document.createElement(tag);
        if (classNames.length)
            (_a = element.classList).add.apply(_a, classNames);
        if (innerText)
            element.innerText = innerText;
        return element;
    }
    ;
    function generateWeaponElements() {
        if (!WeaponLoadoutSystem.weaponsContainer) {
            console.error("weaponsContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.weaponsContainer.innerHTML = "";
        var currentWeapons = [];
        for (var i = 0; i < 2; i++) {
            var currentWeaponsAttachments = [];
            var weaponContainerElement = createElement("div", ["weapon-container"]);
            var weaponElement = createElement("div", ["weapon"]);
            var weaponSlotNameElement = createElement("span", ["slot-name"], i === 0 ? "Primary" : "Secondary");
            var weaponImgElement = createElement("img");
            var weaponNameElement = createElement("div", ["weapon-name"]);
            var attachmentsContainerElement = createElement("div", ["attachments"]);
            var attachmentSlotNameElement = createElement("span", ["slot-name"], "Attachments");
            var attachmentElements = [];
            for (var k = 0; k < 2; k++) {
                var attachmentElement = createElement("div", ["attachment-container"]);
                var attachmentItemElement = createElement("div", ["attachment-item"]);
                var attachmentImgElement = createElement("img");
                var attachmentNameElement = createElement("div", ["attachment-name"]);
                currentWeaponsAttachments.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType.Attachment, k === 0, {
                    container: attachmentItemElement,
                    imageElement: attachmentImgElement,
                    nameElement: attachmentNameElement
                }, k !== 0));
                attachmentItemElement.append(attachmentImgElement);
                attachmentElement.append(attachmentItemElement, attachmentNameElement);
                attachmentElements.push(attachmentElement);
            }
            currentWeapons.push(WeaponLoadoutSystem.createLoadoutItem(i === 0 ? WeaponLoadoutSystem.LoadoutType.Primary_Weapon : WeaponLoadoutSystem.LoadoutType.Secondary_Weapon, true, {
                container: weaponElement,
                imageElement: weaponImgElement,
                nameElement: weaponNameElement
            }, undefined, currentWeaponsAttachments));
            weaponElement.append(weaponSlotNameElement, weaponImgElement, weaponNameElement);
            attachmentsContainerElement.append.apply(attachmentsContainerElement, __spreadArray([attachmentSlotNameElement], attachmentElements, false));
            weaponContainerElement.append(weaponElement, attachmentsContainerElement);
            WeaponLoadoutSystem.weaponsContainer.append(weaponContainerElement);
            WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentWeaponsAttachments, true), WeaponLoadoutSystem.allInteractableItems);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentWeapons, true), WeaponLoadoutSystem.allInteractableItems);
    }
    WeaponLoadoutSystem.generateWeaponElements = generateWeaponElements;
    function generatePerkElements() {
        if (!WeaponLoadoutSystem.perksContainer) {
            console.error("perksContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.perksContainer.innerHTML = "";
        var currentPerks = [];
        for (var i = 0; i < 3; i++) {
            var perkContainerElement = createElement("div", ["perk-container"]);
            var perkSlotNameElement = createElement("span", ["slot-name"], "Perk 0".concat(i + 1));
            var perkElements = [];
            for (var k = 0; k < 2; k++) {
                var perkElement = createElement("div", ["perk"]);
                var perkItemElement = createElement("div", ["perk-item"]);
                var perkImgElement = createElement("img");
                var perkNameElement = createElement("div", ["perk-name"]);
                var perkKey = "Perk_0".concat(i + 1);
                currentPerks.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType[perkKey], k === 0, {
                    container: perkItemElement,
                    imageElement: perkImgElement,
                    nameElement: perkNameElement
                }, k !== 0));
                perkItemElement.append(perkImgElement);
                perkElement.append(perkItemElement, perkNameElement);
                perkElements.push(perkElement);
            }
            perkContainerElement.append.apply(perkContainerElement, __spreadArray([perkSlotNameElement], perkElements, false));
            WeaponLoadoutSystem.perksContainer.append(perkContainerElement);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentPerks, true), WeaponLoadoutSystem.allInteractableItems);
    }
    WeaponLoadoutSystem.generatePerkElements = generatePerkElements;
    function generateThrowableElements() {
        if (!WeaponLoadoutSystem.throwablesContainer) {
            console.error("throwablesContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.throwablesContainer.innerHTML = "";
        var currentThrowables = [];
        for (var i = 0; i < 2; i++) {
            var throwableContainerElement = createElement("div", ["throwable-container"]);
            var throwableSlotNameElement = createElement("span", ["slot-name"], i === 0 ? "Lethals" : "Tacticals");
            var throwableElements = [];
            for (var k = 0; k < 1; k++) {
                var slotsElement = createElement("div", ["slots"]);
                for (var j = 0; j < 2; j++) {
                    var throwableElement = createElement("div", ["throwable"]);
                    var throwableItemElement = createElement("div", ["throwable-item"]);
                    var throwableImgElement = createElement("img");
                    var throwableNameElement = createElement("div", ["throwable-name"]);
                    currentThrowables.push(WeaponLoadoutSystem.createLoadoutItem(i === 0 ? WeaponLoadoutSystem.LoadoutType.Lethal : WeaponLoadoutSystem.LoadoutType.Tactical, j === 0, {
                        container: throwableItemElement,
                        imageElement: throwableImgElement,
                        nameElement: throwableNameElement
                    }, j !== 0));
                    throwableItemElement.append(throwableImgElement);
                    throwableElement.append(throwableItemElement, throwableNameElement);
                    slotsElement.append(throwableElement);
                }
                throwableElements.push(slotsElement);
            }
            throwableContainerElement.append.apply(throwableContainerElement, __spreadArray([throwableSlotNameElement], throwableElements, false));
            WeaponLoadoutSystem.throwablesContainer.append(throwableContainerElement);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentThrowables, true), WeaponLoadoutSystem.allInteractableItems);
    }
    WeaponLoadoutSystem.generateThrowableElements = generateThrowableElements;
    function generateEnhancementElements() {
        if (!WeaponLoadoutSystem.enhancementsContainer) {
            console.error("enhancementsContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.enhancementsContainer.innerHTML = "";
        var currentEnhancements = [];
        var enhancementSlotNameElement = createElement("span", ["slot-name"], "Enhancements");
        var enhancementElements = [];
        for (var i = 0; i < 3; i++) {
            var enhancementContainerElement = createElement("div", ["enhancement-container"]);
            var enhancementInfoElement = createElement("div", ["enhancement-info"]);
            var enhancementTitleElement = createElement("div", ["enhancement-title"], "Enhancement 0".concat(i + 1));
            var enhancementImgElement = createElement("img");
            var enhancementKey = "Enhancement_0".concat(i + 1);
            currentEnhancements.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType[enhancementKey], true, {
                container: enhancementContainerElement,
                imageElement: enhancementImgElement,
                nameElement: enhancementTitleElement
            }));
            enhancementInfoElement.append(enhancementTitleElement);
            enhancementContainerElement.append(enhancementInfoElement, enhancementImgElement);
            enhancementElements.push(enhancementContainerElement);
        }
        WeaponLoadoutSystem.enhancementsContainer.append.apply(WeaponLoadoutSystem.enhancementsContainer, __spreadArray([enhancementSlotNameElement], enhancementElements, false));
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentEnhancements, true), WeaponLoadoutSystem.allInteractableItems);
    }
    WeaponLoadoutSystem.generateEnhancementElements = generateEnhancementElements;
    function generateSelectionItemElements() {
        if (!WeaponLoadoutSystem.selectionItems) {
            console.error("selectionItems is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.selectionItems.innerHTML = "";
        var currentSelectionItems = [];
        for (var i = 0; i < 8; i++) {
            var slotItemElement = createElement("div", ["slot-item"]);
            var slotItemImgElement = createElement("img");
            var slotItemNameElement = createElement("div", ["item-name"]);
            currentSelectionItems.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType.Empty, false, {
                container: slotItemElement,
                imageElement: slotItemImgElement,
                nameElement: slotItemNameElement
            }));
            slotItemElement.append(slotItemImgElement, slotItemNameElement);
            WeaponLoadoutSystem.selectionItems.append(slotItemElement);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentSelectionItems, true), WeaponLoadoutSystem.allSelectionItems);
    }
    WeaponLoadoutSystem.generateSelectionItemElements = generateSelectionItemElements;
    function generateWeaponOptionTypeElements() {
        if (!WeaponLoadoutSystem.weaponTypeOptionsContainer) {
            console.error("weaponTypeOptionsContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.weaponTypeOptionsContainer.innerHTML = "";
        var currentWeaponTypeItems = [];
        for (var i = 0; i < 5; i++) {
            var slotItemElement = createElement("div", ["weapon-option-type"]);
            var slotItemImgElement = createElement("img");
            var slotItemNameElement = createElement("div", ["weapon-option-name"]);
            currentWeaponTypeItems.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType.Empty, false, {
                container: slotItemElement,
                imageElement: slotItemImgElement,
                nameElement: slotItemNameElement
            }));
            slotItemElement.append(slotItemImgElement, slotItemNameElement);
            WeaponLoadoutSystem.weaponTypeOptionsContainer.append(slotItemElement);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentWeaponTypeItems, true), WeaponLoadoutSystem.allWeaponTypeItems);
    }
    WeaponLoadoutSystem.generateWeaponOptionTypeElements = generateWeaponOptionTypeElements;
    function generateWeaponSelectionItemElements() {
        if (!WeaponLoadoutSystem.weaponSelectionItems) {
            console.error("weaponSelectionItems is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.weaponSelectionItems.innerHTML = "";
        var currentSelectionItems = [];
        for (var i = 0; i < 8; i++) {
            var slotItemElement = createElement("div", ["slot-item"]);
            var slotItemImgElement = createElement("img");
            var slotItemNameElement = createElement("div", ["item-name"]);
            currentSelectionItems.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType.Empty, false, {
                container: slotItemElement,
                imageElement: slotItemImgElement,
                nameElement: slotItemNameElement
            }));
            slotItemElement.append(slotItemImgElement, slotItemNameElement);
            WeaponLoadoutSystem.weaponSelectionItems.append(slotItemElement);
        }
        WeaponLoadoutSystem.assignSelectionItemID(__spreadArray([], currentSelectionItems, true), WeaponLoadoutSystem.allWeaponSelectionItems);
    }
    WeaponLoadoutSystem.generateWeaponSelectionItemElements = generateWeaponSelectionItemElements;
    function generateReplaceableItemElements() {
        if (!WeaponLoadoutSystem.replaceableItemsContainer) {
            console.error("replaceableItemsContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.replaceableItemsContainer.innerHTML = "";
        var currentReplaceableItems = [];
        for (var i = 0; i < 10; i++) {
            var slotItemElement = createElement("div", ["slot-item"]);
            var slotItemImgElement = createElement("img");
            var slotItemNameElement = createElement("div", ["item-name"]);
            currentReplaceableItems.push(WeaponLoadoutSystem.createLoadoutItem(WeaponLoadoutSystem.LoadoutType.Empty, false, {
                container: slotItemElement,
                imageElement: slotItemImgElement,
                nameElement: slotItemNameElement
            }));
            slotItemElement.append(slotItemImgElement, slotItemNameElement);
            WeaponLoadoutSystem.replaceableItemsContainer.append(slotItemElement);
        }
        WeaponLoadoutSystem.allReplacementItems.push.apply(WeaponLoadoutSystem.allReplacementItems, currentReplaceableItems);
    }
    WeaponLoadoutSystem.generateReplaceableItemElements = generateReplaceableItemElements;
    function generateCapacityIndicators() {
        if (!WeaponLoadoutSystem.capacityIndicatorContainer) {
            console.error("capacityIndicatorContainer is not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.capacityIndicatorContainer.innerHTML = "";
        for (var i = 0; i < 10; i++) {
            var capacityIndicatorElement = createElement("div", ["capacity-indicator"]);
            WeaponLoadoutSystem.allCapacityIndicators.push(capacityIndicatorElement);
            WeaponLoadoutSystem.capacityIndicatorContainer.append(capacityIndicatorElement);
        }
    }
    WeaponLoadoutSystem.generateCapacityIndicators = generateCapacityIndicators;
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
