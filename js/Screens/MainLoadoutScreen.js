"use strict";
var WeaponLoadoutSystem;
(function (WeaponLoadoutSystem) {
    WeaponLoadoutSystem.allCapacityIndicators = [];
    WeaponLoadoutSystem.allInteractableItems = [];
    document.addEventListener("keydown", function (event) {
        if (event.key === "c" && !WeaponLoadoutSystem.onSecondaryPage) {
            WeaponLoadoutSystem.clearAll();
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && WeaponLoadoutSystem.onSecondaryPage && !WeaponLoadoutSystem.overlayIsOpen) {
            WeaponLoadoutSystem.navigateBack();
        }
    });
    document.addEventListener("DOMContentLoaded", init);
    function init() {
        WeaponLoadoutSystem.loadoutContainer = document.getElementById("loadoutContainer");
        WeaponLoadoutSystem.loadoutControlsContainer = document.getElementById("loadoutControlsContainer");
        WeaponLoadoutSystem.capacityIndicatorContainer = document.getElementById("capacityIndicatorContainer");
        WeaponLoadoutSystem.capacityAmountText = document.getElementById("capacityAmountText");
        WeaponLoadoutSystem.itemsContainer = document.getElementById("itemsContainer");
        WeaponLoadoutSystem.weaponsContainer = document.getElementById("weaponsContainer");
        WeaponLoadoutSystem.perksContainer = document.getElementById("perksContainer");
        WeaponLoadoutSystem.throwablesContainer = document.getElementById("throwablesContainer");
        WeaponLoadoutSystem.enhancementsContainer = document.getElementById("enhancementsContainer");
        WeaponLoadoutSystem.clearAllControlPrompt = document.getElementById("clearAllControlPrompt");
        WeaponLoadoutSystem.clearControlPrompt = document.getElementById("clearControlPrompt");
        WeaponLoadoutSystem.backControlPrompt = document.getElementById("backControlPrompt");
        setupScreen();
    }
    function setupScreen() {
        WeaponLoadoutSystem.generateCapacityIndicators();
        WeaponLoadoutSystem.generateWeaponElements();
        WeaponLoadoutSystem.generatePerkElements();
        WeaponLoadoutSystem.generateThrowableElements();
        WeaponLoadoutSystem.generateEnhancementElements();
        WeaponLoadoutSystem.disableNecessaryItems();
        WeaponLoadoutSystem.updateCapacityIndicator();
        setEventListeners();
    }
    function setEventListeners() {
        var toggleClearControlPrompt = function (isVisible) {
            if (WeaponLoadoutSystem.clearControlPrompt) {
                WeaponLoadoutSystem.clearControlPrompt.style.display = isVisible ? 'flex' : 'none';
                if (!isVisible)
                    WeaponLoadoutSystem.hoveredSlot = null;
            }
        };
        WeaponLoadoutSystem.allInteractableItems.forEach(function (slot) {
            if (!slot.loadoutItemElements)
                return;
            var container = slot.loadoutItemElements.container;
            container.addEventListener("click", function () { return WeaponLoadoutSystem.navigateTo(slot); });
            container.addEventListener("mouseenter", function () {
                var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === slot.id; });
                if (slotIndex !== -1) {
                    if (WeaponLoadoutSystem.allInteractableItems[slotIndex].isPopulated && WeaponLoadoutSystem.clearControlPrompt && WeaponLoadoutSystem.clearControlPrompt.style.display === 'none') {
                        toggleClearControlPrompt(true);
                        WeaponLoadoutSystem.hoveredSlot = WeaponLoadoutSystem.allInteractableItems[slotIndex];
                    }
                }
                else {
                    console.warn("Slot not found in allInteractableItems.", WeaponLoadoutSystem.allInteractableItems[slotIndex]);
                }
            });
            container.addEventListener("mouseleave", function () {
                if (WeaponLoadoutSystem.clearControlPrompt && WeaponLoadoutSystem.clearControlPrompt.style.display === 'flex') {
                    toggleClearControlPrompt(false);
                }
            });
            container.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                if (WeaponLoadoutSystem.hoveredSlot && WeaponLoadoutSystem.hoveredSlot !== WeaponLoadoutSystem.loadoutItemOptions.Empty[0]) {
                    var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === (WeaponLoadoutSystem.hoveredSlot === null || WeaponLoadoutSystem.hoveredSlot === void 0 ? void 0 : WeaponLoadoutSystem.hoveredSlot.id); });
                    if (slotIndex !== -1) {
                        var currentHoveredSlot = WeaponLoadoutSystem.hoveredSlot;
                        WeaponLoadoutSystem.clearSlot(WeaponLoadoutSystem.hoveredSlot);
                        if (WeaponLoadoutSystem.enhancementTypes.includes(currentHoveredSlot.type)) {
                            WeaponLoadoutSystem.updateEnhancementAction(currentHoveredSlot.type, currentHoveredSlot.name, true);
                        }
                        if (WeaponLoadoutSystem.clearControlPrompt) {
                            WeaponLoadoutSystem.clearControlPrompt.style.display = 'none';
                        }
                    }
                    else {
                        console.warn("Slot not found in allInteractableItems.", WeaponLoadoutSystem.hoveredSlot);
                    }
                }
            });
        });
        if (WeaponLoadoutSystem.backControlPrompt) {
            WeaponLoadoutSystem.backControlPrompt.addEventListener("click", function () { return WeaponLoadoutSystem.navigateBack(); });
        }
        if (WeaponLoadoutSystem.clearAllControlPrompt) {
            WeaponLoadoutSystem.clearAllControlPrompt.addEventListener("click", function () { return WeaponLoadoutSystem.clearAll(); });
        }
    }
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
