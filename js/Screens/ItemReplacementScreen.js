"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var BLUR_CLASSNAME = "blur";
    WeaponLoadoutSystem.allReplacementItems = [];
    document.addEventListener("DOMContentLoaded", init);
    document.addEventListener("keydown", function (event) {
        if (event.key === "c" && WeaponLoadoutSystem.overlayIsOpen) {
            closeOverlay();
        }
    });
    function init() {
        WeaponLoadoutSystem.loadoutOverlayContainer = document.getElementById("loadoutOverlayContainer");
        WeaponLoadoutSystem.replaceableItemsContainer = document.getElementById("replaceableItemsContainer");
        WeaponLoadoutSystem.overlayCancelControlPrompt = document.getElementById("overlayCancelControlPrompt");
        setupScreen();
    }
    function setupScreen() {
        WeaponLoadoutSystem.generateReplaceableItemElements();
        setEventListeners();
    }
    function setEventListeners() {
        if (WeaponLoadoutSystem.overlayCancelControlPrompt) {
            WeaponLoadoutSystem.overlayCancelControlPrompt.addEventListener("click", function () { return closeOverlay(); });
        }
    }
    function populateReplaceableItems() {
        if (!WeaponLoadoutSystem.loadoutContainer || !WeaponLoadoutSystem.loadoutControlsContainer || !WeaponLoadoutSystem.loadoutOverlayContainer) {
            console.error("some main containers are not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.overlayIsOpen = true;
        WeaponLoadoutSystem.loadoutContainer.classList.add(BLUR_CLASSNAME);
        WeaponLoadoutSystem.loadoutControlsContainer.classList.add(BLUR_CLASSNAME);
        WeaponLoadoutSystem.loadoutOverlayContainer.style.display = 'flex';
        var currentSelectedItems = WeaponLoadoutSystem.allInteractableItems.filter(function (item) { return item.isPopulated; });
        var _loop_1 = function (i) {
            var loadoutOption = currentSelectedItems[i];
            WeaponLoadoutSystem.allReplacementItems[i] = __assign(__assign({}, WeaponLoadoutSystem.allReplacementItems[i]), { name: loadoutOption.name, image: loadoutOption.image, type: loadoutOption.type, isActive: loadoutOption.isActive, isPopulated: loadoutOption.isPopulated, id: loadoutOption.id });
            var loadoutItemElements = WeaponLoadoutSystem.allReplacementItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.allReplacementItems[i].name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.allReplacementItems[i].image;
                loadoutItemElements.container.addEventListener("click", function () { return replaceItem(WeaponLoadoutSystem.allReplacementItems[i]); });
                loadoutItemElements.container.classList.toggle("weapon", WeaponLoadoutSystem.allReplacementItems[i].type === WeaponLoadoutSystem.LoadoutType.Primary_Weapon || WeaponLoadoutSystem.allReplacementItems[i].type === WeaponLoadoutSystem.LoadoutType.Secondary_Weapon);
            }
        };
        for (var i = 0; i < WeaponLoadoutSystem.allReplacementItems.length; i++) {
            _loop_1(i);
        }
    }
    WeaponLoadoutSystem.populateReplaceableItems = populateReplaceableItems;
    function replaceItem(selectedReplaceableItem) {
        var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === selectedReplaceableItem.id; });
        var allSelectableItemsTypes = __spreadArray(__spreadArray([], WeaponLoadoutSystem.allSelectionItems, true), WeaponLoadoutSystem.allWeaponSelectionItems, true);
        if (slotIndex !== -1) {
            WeaponLoadoutSystem.clearSlot(WeaponLoadoutSystem.allInteractableItems[slotIndex]);
            WeaponLoadoutSystem.handleSelectionSlotInteraction(WeaponLoadoutSystem.desiredItem, allSelectableItemsTypes);
            if (WeaponLoadoutSystem.enhancementTypes.includes(WeaponLoadoutSystem.allInteractableItems[slotIndex].type)) {
                WeaponLoadoutSystem.updateEnhancementAction(WeaponLoadoutSystem.allInteractableItems[slotIndex].type, WeaponLoadoutSystem.allInteractableItems[slotIndex].name, true);
            }
            closeOverlay();
        }
        else {
            console.warn("Slot not found in allInteractableItems.", WeaponLoadoutSystem.hoveredSlot);
        }
    }
    function closeOverlay() {
        if (!WeaponLoadoutSystem.loadoutContainer || !WeaponLoadoutSystem.loadoutControlsContainer || !WeaponLoadoutSystem.loadoutOverlayContainer) {
            console.error("some main containers are not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.overlayIsOpen = false;
        WeaponLoadoutSystem.loadoutContainer.classList.remove(BLUR_CLASSNAME);
        WeaponLoadoutSystem.loadoutControlsContainer.classList.remove(BLUR_CLASSNAME);
        WeaponLoadoutSystem.loadoutOverlayContainer.style.display = 'none';
    }
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
