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
var WeaponLoadoutSystem;
(function (WeaponLoadoutSystem) {
    WeaponLoadoutSystem.allSelectionItems = [];
    document.addEventListener("DOMContentLoaded", init);
    function init() {
        WeaponLoadoutSystem.itemSelectionContainer = document.getElementById("itemSelectionContainer");
        WeaponLoadoutSystem.selectionItems = document.getElementById("selectionItems");
        WeaponLoadoutSystem.itemSelectionSlotTitle = document.getElementById("itemSelectionSlotTitle");
        WeaponLoadoutSystem.itemSelectionInfoSlotTitle = document.getElementById("itemSelectionInfoSlotTitle");
        WeaponLoadoutSystem.itemSelectionItemImg = document.getElementById("itemSelectionItemImg");
        WeaponLoadoutSystem.itemSelectionItemName = document.getElementById("itemSelectionItemName");
        WeaponLoadoutSystem.itemSelectionItemDescription = document.getElementById("itemSelectionItemDescription");
        setupScreen();
    }
    function setupScreen() {
        WeaponLoadoutSystem.generateSelectionItemElements();
        setEventListeners();
    }
    function setEventListeners() {
        WeaponLoadoutSystem.allSelectionItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("mouseenter", function () { return setSelectionItemDetails(item); });
                item.loadoutItemElements.container.addEventListener("click", function () { return WeaponLoadoutSystem.handleSelectionSlotInteraction(item, WeaponLoadoutSystem.allSelectionItems); });
            }
        });
    }
    function populateSelectionItems(currentLoadoutItem) {
        var _a;
        if (!WeaponLoadoutSystem.itemSelectionSlotTitle || !WeaponLoadoutSystem.itemSelectionInfoSlotTitle) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }
        var emptySlot = WeaponLoadoutSystem.loadoutItemOptions[WeaponLoadoutSystem.LoadoutType.Empty][0];
        for (var i = 0; i < WeaponLoadoutSystem.allSelectionItems.length; i++) {
            var loadoutOption = ((_a = WeaponLoadoutSystem.loadoutItemOptions[currentLoadoutItem.type]) === null || _a === void 0 ? void 0 : _a[i]) || emptySlot;
            WeaponLoadoutSystem.allSelectionItems[i] = __assign(__assign({}, WeaponLoadoutSystem.allSelectionItems[i]), { name: loadoutOption.name, image: loadoutOption.image, type: loadoutOption.type, isActive: loadoutOption.isActive, isPopulated: loadoutOption.isPopulated, description: loadoutOption.description || currentLoadoutItem.description });
            var loadoutItemElements = WeaponLoadoutSystem.allSelectionItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.allSelectionItems[i].name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.allSelectionItems[i].image;
                loadoutItemElements.container.classList.toggle("is-Disabled", !WeaponLoadoutSystem.allSelectionItems[i].isActive);
                loadoutItemElements.imageElement.style.visibility = WeaponLoadoutSystem.allSelectionItems[i].isPopulated ? "visible" : "hidden";
            }
        }
        WeaponLoadoutSystem.itemSelectionSlotTitle.innerHTML = "".concat(WeaponLoadoutSystem.allSelectionItems[0].type, " Selection");
        WeaponLoadoutSystem.itemSelectionInfoSlotTitle.innerHTML = "".concat(WeaponLoadoutSystem.allSelectionItems[0].type, " Details");
        setSelectionItemDetails(WeaponLoadoutSystem.allSelectionItems[0]);
    }
    WeaponLoadoutSystem.populateSelectionItems = populateSelectionItems;
    function setSelectionItemDetails(currentSelectionItem) {
        var _a;
        if (!WeaponLoadoutSystem.itemSelectionItemImg || !WeaponLoadoutSystem.itemSelectionItemName || !WeaponLoadoutSystem.itemSelectionItemDescription) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }
        var slotIndex = WeaponLoadoutSystem.allSelectionItems.findIndex(function (item) { return item.id === currentSelectionItem.id; });
        if (slotIndex !== -1) {
            WeaponLoadoutSystem.itemSelectionItemImg.src = WeaponLoadoutSystem.allSelectionItems[slotIndex].image;
            WeaponLoadoutSystem.itemSelectionItemName.innerHTML = WeaponLoadoutSystem.allSelectionItems[slotIndex].name;
            WeaponLoadoutSystem.itemSelectionItemDescription.innerHTML = (_a = WeaponLoadoutSystem.allSelectionItems[slotIndex].description) !== null && _a !== void 0 ? _a : "";
        }
        else {
            console.warn("Slot not found in allSelectionItems.", WeaponLoadoutSystem.allSelectionItems[slotIndex]);
        }
    }
    WeaponLoadoutSystem.setSelectionItemDetails = setSelectionItemDetails;
    function updateEnhancementAction(wilcardType, enhancementName, shouldDisable) {
        var enhancementSlotIndex;
        switch (wilcardType) {
            case WeaponLoadoutSystem.LoadoutType.Enhancement_01:
                enhancementSlotIndex = WeaponLoadoutSystem.loadoutItemOptions["Enhancement 01"].findIndex(function (item) { return item.name === enhancementName; });
                triggerEnhancement01Action(enhancementSlotIndex, shouldDisable);
                break;
            case WeaponLoadoutSystem.LoadoutType.Enhancement_02:
                enhancementSlotIndex = WeaponLoadoutSystem.loadoutItemOptions["Enhancement 02"].findIndex(function (item) { return item.name === enhancementName; });
                triggerEnhancement02Action(enhancementSlotIndex, shouldDisable);
                break;
            case WeaponLoadoutSystem.LoadoutType.Enhancement_03:
                enhancementSlotIndex = WeaponLoadoutSystem.loadoutItemOptions["Enhancement 03"].findIndex(function (item) { return item.name === enhancementName; });
                triggerEnhancement03Action(enhancementSlotIndex, shouldDisable);
                break;
            default:
                console.warn("Invalid Enhancement type");
                break;
        }
    }
    WeaponLoadoutSystem.updateEnhancementAction = updateEnhancementAction;
    function triggerEnhancement01Action(enhancementSlotIndex, shouldDisable) {
        var allSecondPerkSlots = [
            WeaponLoadoutSystem.allInteractableItems.find(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Perk_01 && item.isSecondSlot; }),
            WeaponLoadoutSystem.allInteractableItems.find(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Perk_02 && item.isSecondSlot; }),
            WeaponLoadoutSystem.allInteractableItems.find(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Perk_03 && item.isSecondSlot; })
        ];
        if (allSecondPerkSlots.some(function (perkSlot) { return !perkSlot; }))
            return;
        allSecondPerkSlots.forEach(function (perkSlot) {
            var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === (perkSlot === null || perkSlot === void 0 ? void 0 : perkSlot.id); });
            WeaponLoadoutSystem.deactivateSlot(slotIndex);
        });
        var targetSlotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { var _a; return item.id === ((_a = allSecondPerkSlots[enhancementSlotIndex]) === null || _a === void 0 ? void 0 : _a.id); });
        WeaponLoadoutSystem.activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }
    function triggerEnhancement02Action(enhancementSlotIndex, shouldDisable) {
        var allAttachmentPerkSlots = WeaponLoadoutSystem.allInteractableItems.filter(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Attachment && item.isSecondSlot; });
        if (allAttachmentPerkSlots.some(function (attachmentSlot) { return !attachmentSlot; }))
            return;
        allAttachmentPerkSlots.forEach(function (attachmentSlot) {
            var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === (attachmentSlot === null || attachmentSlot === void 0 ? void 0 : attachmentSlot.id); });
            WeaponLoadoutSystem.deactivateSlot(slotIndex);
        });
        var targetSlotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { var _a; return item.id === ((_a = allAttachmentPerkSlots[enhancementSlotIndex]) === null || _a === void 0 ? void 0 : _a.id); });
        WeaponLoadoutSystem.activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }
    function triggerEnhancement03Action(enhancementSlotIndex, shouldDisable) {
        var allEquipmentSlots = [
            WeaponLoadoutSystem.allInteractableItems.find(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Lethal && item.isSecondSlot; }),
            WeaponLoadoutSystem.allInteractableItems.find(function (item) { return item.type === WeaponLoadoutSystem.LoadoutType.Tactical && item.isSecondSlot; })
        ];
        if (allEquipmentSlots.some(function (equipmentSlot) { return !equipmentSlot; }))
            return;
        allEquipmentSlots.forEach(function (equipmentSlot) {
            var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === (equipmentSlot === null || equipmentSlot === void 0 ? void 0 : equipmentSlot.id); });
            WeaponLoadoutSystem.deactivateSlot(slotIndex);
        });
        var targetSlotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { var _a; return item.id === ((_a = allEquipmentSlots[enhancementSlotIndex]) === null || _a === void 0 ? void 0 : _a.id); });
        WeaponLoadoutSystem.activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
