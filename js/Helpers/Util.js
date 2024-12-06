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
    function createLoadoutItem(type, isActive, itemElements, isSecondSlot, attachments, description) {
        var loadoutItem = {
            name: "",
            image: "",
            type: type,
            isActive: isActive,
            isPopulated: false,
            loadoutItemElements: itemElements,
            isSecondSlot: isSecondSlot,
            attachments: attachments,
            description: description !== null && description !== void 0 ? description : ""
        };
        return loadoutItem;
    }
    WeaponLoadoutSystem.createLoadoutItem = createLoadoutItem;
    ;
    function getLoadoutType(id) {
        return Object.values(WeaponLoadoutSystem.LoadoutType).includes(id) ? id : null;
    }
    WeaponLoadoutSystem.getLoadoutType = getLoadoutType;
    function assignSelectionItemID(itemsToSet, itemsArray) {
        var currentId = itemsArray.length > 0 ? Math.max.apply(Math, itemsArray.map(function (item) { return item.id || 0; })) + 1 : 1;
        itemsToSet.forEach(function (item) {
            if (item.id === undefined) {
                item.id = currentId++;
            }
            itemsArray.push(item);
        });
    }
    WeaponLoadoutSystem.assignSelectionItemID = assignSelectionItemID;
    function updateCapacityIndicator() {
        var currentPopulatedItems = WeaponLoadoutSystem.allInteractableItems.filter(function (item) { return item.isPopulated; }).length;
        WeaponLoadoutSystem.allCapacityIndicators.forEach(function (indicator, index) {
            indicator.classList.toggle("is-Active", index < currentPopulatedItems);
        });
        if (WeaponLoadoutSystem.capacityAmountText) {
            WeaponLoadoutSystem.capacityAmountText.innerText = "".concat(currentPopulatedItems, "/10");
        }
        if (!WeaponLoadoutSystem.clearAllControlPrompt) {
            console.error("clearAllControlPrompt is not defined or not available.");
            return;
        }
        console.warn("clearAllControlPrompt", currentPopulatedItems);
        WeaponLoadoutSystem.clearAllControlPrompt.style.display = currentPopulatedItems > 0 ? 'flex' : 'none';
    }
    WeaponLoadoutSystem.updateCapacityIndicator = updateCapacityIndicator;
    function updateInteractableItems(updatedSlot) {
        var slotIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { return item.id === updatedSlot.id; });
        if (slotIndex !== -1) {
            WeaponLoadoutSystem.allInteractableItems[slotIndex] = __assign({}, updatedSlot);
        }
        else {
            console.warn("Slot not found in allInteractableItems.", updatedSlot);
        }
        disableNecessaryItems();
        updateCapacityIndicator();
    }
    WeaponLoadoutSystem.updateInteractableItems = updateInteractableItems;
    function disableNecessaryItems() {
        WeaponLoadoutSystem.allInteractableItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.classList.toggle("is-Disabled", !item.isActive);
                item.loadoutItemElements.nameElement.innerHTML = item.isPopulated ? item.name : "";
                item.loadoutItemElements.imageElement.style.visibility = (!item.isPopulated && item.isActive) ? "hidden" : "visible";
                item.loadoutItemElements.imageElement.src = !item.isActive ? "assets/other/lock.png" : item.image;
            }
        });
    }
    WeaponLoadoutSystem.disableNecessaryItems = disableNecessaryItems;
    function deactivateSlot(slotIndex) {
        var item = WeaponLoadoutSystem.allInteractableItems[slotIndex];
        if (item.isActive) {
            item.isActive = false;
            clearSlot(item);
        }
    }
    WeaponLoadoutSystem.deactivateSlot = deactivateSlot;
    ;
    function activateOrDeactivateSlot(slotIndex, shouldDisable) {
        if (slotIndex === -1) {
            console.warn("Slot not found in allSelectionItems.");
            return;
        }
        var item = WeaponLoadoutSystem.allInteractableItems[slotIndex];
        if (shouldDisable) {
            item.isActive = false;
            clearSlot(item);
        }
        else {
            item.isActive = true;
            updateInteractableItems(item);
        }
    }
    WeaponLoadoutSystem.activateOrDeactivateSlot = activateOrDeactivateSlot;
    ;
    function handleSelectionSlotInteraction(selectedSelectionItem, selectionItemArray) {
        if (!WeaponLoadoutSystem.itemsContainer || !WeaponLoadoutSystem.itemSelectionContainer || !WeaponLoadoutSystem.weaponSelectionContainer) {
            console.warn("certain containers are not defined or not available.");
            return;
        }
        if (!selectionItemArray)
            return;
        if (WeaponLoadoutSystem.allInteractableItems.filter(function (item) { return item.isPopulated; }).length === 10) {
            WeaponLoadoutSystem.desiredItem = selectedSelectionItem;
            WeaponLoadoutSystem.populateReplaceableItems();
            return;
        }
        var slotIndex = selectionItemArray.findIndex(function (item) { return item.id === selectedSelectionItem.id; });
        var duplicateIndex = WeaponLoadoutSystem.allInteractableItems.findIndex(function (item) { var _a; return item.name === ((_a = selectionItemArray[slotIndex]) === null || _a === void 0 ? void 0 : _a.name); });
        if (duplicateIndex !== -1) {
            clearSlot(WeaponLoadoutSystem.allInteractableItems[duplicateIndex]);
        }
        if (slotIndex !== -1) {
            WeaponLoadoutSystem.selectedSlot = __assign(__assign({}, WeaponLoadoutSystem.selectedSlot), { name: selectionItemArray[slotIndex].name, image: selectionItemArray[slotIndex].image, type: WeaponLoadoutSystem.selectedSlot.type, isActive: true, isPopulated: true });
            var loadoutItemElements = WeaponLoadoutSystem.selectedSlot.loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.selectedSlot.name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.selectedSlot.image;
            }
            if (WeaponLoadoutSystem.enhancementTypes.includes(WeaponLoadoutSystem.selectedSlot.type)) {
                WeaponLoadoutSystem.updateEnhancementAction(WeaponLoadoutSystem.selectedSlot.type, WeaponLoadoutSystem.selectedSlot.name, false);
            }
            updateInteractableItems(WeaponLoadoutSystem.selectedSlot);
            navigateBack();
        }
        else {
            console.warn("Slot not found in selectionItemArray.", selectionItemArray[slotIndex]);
        }
    }
    WeaponLoadoutSystem.handleSelectionSlotInteraction = handleSelectionSlotInteraction;
    function clearSlot(currentSlot) {
        currentSlot = __assign(__assign({}, currentSlot), { name: WeaponLoadoutSystem.loadoutItemOptions.Empty[0].name, image: WeaponLoadoutSystem.loadoutItemOptions.Empty[0].image, isPopulated: false });
        if (WeaponLoadoutSystem.hoveredSlot) {
            var loadoutItemElements = WeaponLoadoutSystem.hoveredSlot.loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.loadoutItemOptions.Empty[0].name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.loadoutItemOptions.Empty[0].image;
            }
            WeaponLoadoutSystem.hoveredSlot = null;
        }
        updateInteractableItems(currentSlot);
    }
    WeaponLoadoutSystem.clearSlot = clearSlot;
    function clearAll() {
        if (WeaponLoadoutSystem.allInteractableItems.filter(function (item) { return item.isPopulated; }).length === 0)
            return;
        WeaponLoadoutSystem.allInteractableItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                item = __assign(__assign({}, item), { name: WeaponLoadoutSystem.loadoutItemOptions.Empty[0].name, image: WeaponLoadoutSystem.loadoutItemOptions.Empty[0].image, isPopulated: false });
                var loadoutItemElements = item.loadoutItemElements;
                if (loadoutItemElements) {
                    loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.loadoutItemOptions.Empty[0].name;
                    loadoutItemElements.imageElement.src = WeaponLoadoutSystem.loadoutItemOptions.Empty[0].image;
                }
                updateInteractableItems(item);
            }
        });
    }
    WeaponLoadoutSystem.clearAll = clearAll;
    function navigateTo(currentSlotItem) {
        if (!WeaponLoadoutSystem.itemsContainer || !WeaponLoadoutSystem.itemSelectionContainer || !WeaponLoadoutSystem.weaponSelectionContainer || !WeaponLoadoutSystem.backControlPrompt || !WeaponLoadoutSystem.clearAllControlPrompt) {
            console.warn("certain Containers are not defined or not available.");
            return;
        }
        if (currentSlotItem.type === WeaponLoadoutSystem.LoadoutType.Empty)
            return;
        WeaponLoadoutSystem.onSecondaryPage = true;
        WeaponLoadoutSystem.itemsContainer.style.display = 'none';
        WeaponLoadoutSystem.clearAllControlPrompt.style.display = 'none';
        WeaponLoadoutSystem.backControlPrompt.style.display = 'flex';
        if (currentSlotItem.type === WeaponLoadoutSystem.LoadoutType.Primary_Weapon || currentSlotItem.type === WeaponLoadoutSystem.LoadoutType.Secondary_Weapon) {
            WeaponLoadoutSystem.populateWeaponTypeItems(currentSlotItem.type);
            WeaponLoadoutSystem.populateWeaponSelectionItems(currentSlotItem.type === WeaponLoadoutSystem.LoadoutType.Primary_Weapon ? WeaponLoadoutSystem.PrimaryWeaponType.Assault_Rifle : WeaponLoadoutSystem.SecondaryWeaponType.Pistol);
            WeaponLoadoutSystem.weaponSelectionContainer.style.display = 'flex';
        }
        else {
            WeaponLoadoutSystem.populateSelectionItems(currentSlotItem);
            WeaponLoadoutSystem.itemSelectionContainer.style.display = 'flex';
        }
        WeaponLoadoutSystem.selectedSlot = currentSlotItem;
    }
    WeaponLoadoutSystem.navigateTo = navigateTo;
    function navigateBack() {
        if (!WeaponLoadoutSystem.itemsContainer || !WeaponLoadoutSystem.itemSelectionContainer || !WeaponLoadoutSystem.weaponSelectionContainer || !WeaponLoadoutSystem.backControlPrompt || !WeaponLoadoutSystem.clearAllControlPrompt) {
            console.warn("certain Containers are not defined or not available.");
            return;
        }
        WeaponLoadoutSystem.onSecondaryPage = false;
        WeaponLoadoutSystem.itemsContainer.style.display = 'flex';
        WeaponLoadoutSystem.clearAllControlPrompt.style.display = 'flex';
        WeaponLoadoutSystem.itemSelectionContainer.style.display = 'none';
        WeaponLoadoutSystem.weaponSelectionContainer.style.display = 'none';
        WeaponLoadoutSystem.backControlPrompt.style.display = 'none';
    }
    WeaponLoadoutSystem.navigateBack = navigateBack;
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
