namespace WeaponLoadoutSystem {

    export function createLoadoutItem(type: LoadoutType, isActive: boolean, itemElements: LoadoutItemElements, isSecondSlot?: boolean, attachments?: LoadoutItem[], description?: string): LoadoutItem {
        const loadoutItem: LoadoutItem = {
            name: "",
            image: "",
            type: type,
            isActive: isActive,
            isPopulated: false, 
            loadoutItemElements: itemElements, 
            isSecondSlot: isSecondSlot,
            attachments: attachments,
            description: description ?? ""
        }

        return loadoutItem;
    };

    export function getLoadoutType(id: string): LoadoutType | null {
        return Object.values(LoadoutType).includes(id as LoadoutType) ? (id as LoadoutType) : null;
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function assignSelectionItemID(itemsToSet: LoadoutItem[], itemsArray: LoadoutItem[]) {
        let currentId = itemsArray.length > 0 ? Math.max(...itemsArray.map(item => item.id || 0)) + 1 : 1;

        itemsToSet.forEach((item) => {
            // Assign a unique ID if not already present
            if (item.id === undefined) {
                item.id = currentId++;
            }

            itemsArray.push(item);
        });
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function updateCapacityIndicator() {
        const currentPopulatedItems = allInteractableItems.filter(item => item.isPopulated).length;

        allCapacityIndicators.forEach((indicator, index) => {
            indicator.classList.toggle("is-Active", index < currentPopulatedItems);
        });
    
        if (capacityAmountText) {
            capacityAmountText.innerText = `${currentPopulatedItems}/10`;
        }

        if (!clearAllControlPrompt) {
            console.error("clearAllControlPrompt is not defined or not available.");
            return;
        }
        console.warn("clearAllControlPrompt", currentPopulatedItems);
        clearAllControlPrompt.style.display = currentPopulatedItems > 0 ? 'flex' : 'none';
    }

    export function updateInteractableItems(updatedSlot: LoadoutItem) {
        const slotIndex = allInteractableItems.findIndex(item => item.id === updatedSlot.id);
        if (slotIndex !== -1) {
            allInteractableItems[slotIndex] = { ...updatedSlot };
        } else {
            console.warn("Slot not found in allInteractableItems.", updatedSlot);
        }

        // Update loadout
        disableNecessaryItems();
        updateCapacityIndicator();
    }

    export function disableNecessaryItems() {
        allInteractableItems.forEach(item => {
            if(item.loadoutItemElements) {
                item.loadoutItemElements.container.classList.toggle("is-Disabled", !item.isActive);
                item.loadoutItemElements.nameElement.innerHTML = item.isPopulated ? item.name : "";
                item.loadoutItemElements.imageElement.style.visibility = (!item.isPopulated && item.isActive) ? "hidden" : "visible";
                item.loadoutItemElements.imageElement.src = !item.isActive ? "assets/other/lock.png" : item.image;
            }
        });
    }
    
    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function deactivateSlot (slotIndex: number) {
        const item = allInteractableItems[slotIndex];
        if (item.isActive) {
            item.isActive = false;
            clearSlot(item);
        }
    };

    export function activateOrDeactivateSlot(slotIndex: number, shouldDisable: boolean)  {
        if (slotIndex === -1) {
            console.warn("Slot not found in allSelectionItems.");
            return;
        }

        const item = allInteractableItems[slotIndex];
        if (shouldDisable) {
            item.isActive = false;
            clearSlot(item);
        } else {
            item.isActive = true;
            updateInteractableItems(item);
        }
    };
    
    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function handleSelectionSlotInteraction(selectedSelectionItem: LoadoutItem, selectionItemArray: LoadoutItem[]) {
        if (!itemsContainer || !itemSelectionContainer || !weaponSelectionContainer) {
            console.warn("certain containers are not defined or not available.");
            return;
        }

        if(!selectionItemArray) return;

        if (allInteractableItems.filter(item => item.isPopulated).length === 10) {
            desiredItem = selectedSelectionItem;
            populateReplaceableItems();
            return;
        }

        const slotIndex = selectionItemArray.findIndex(item => item.id === selectedSelectionItem.id);

        // Check for duplicates and remove if found
        const duplicateIndex = allInteractableItems.findIndex(item => item.name === selectionItemArray[slotIndex]?.name);
        if (duplicateIndex !== -1) {
            clearSlot(allInteractableItems[duplicateIndex]);
        }

        if (slotIndex !== -1) {
            // Update selected slot
            selectedSlot = {
                ...selectedSlot,
                name: selectionItemArray[slotIndex].name,
                image: selectionItemArray[slotIndex].image,
                type: selectedSlot.type,
                isActive: true,
                isPopulated: true
            };

            const loadoutItemElements = selectedSlot.loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = selectedSlot.name;
                loadoutItemElements.imageElement.src = selectedSlot.image;
            }

            // Trigger action for Enhancements
            if (enhancementTypes.includes(selectedSlot.type)) {
                updateEnhancementAction(selectedSlot.type, selectedSlot.name, false);
            }
            
            // Update the global array with the new data
            updateInteractableItems(selectedSlot);

            // Reset screen
            navigateBack()
        } else {
            console.warn("Slot not found in selectionItemArray.",  selectionItemArray[slotIndex]);
        }
    }

    export function clearSlot(currentSlot: LoadoutItem) {
        currentSlot = {
            ...currentSlot,
            name: loadoutItemOptions.Empty[0].name,
            image: loadoutItemOptions.Empty[0].image,
            isPopulated: false
        };

        if (hoveredSlot) {
            const loadoutItemElements = hoveredSlot.loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = loadoutItemOptions.Empty[0].name;
                loadoutItemElements.imageElement.src = loadoutItemOptions.Empty[0].image;
            }
            
            hoveredSlot = null; 
        }
        updateInteractableItems(currentSlot);
    }

    export function clearAll() {
        if (allInteractableItems.filter(item => item.isPopulated).length === 0) return;
        
        allInteractableItems.forEach(item => {
            if(item.loadoutItemElements) {
                item = {
                    ...item,
                    name: loadoutItemOptions.Empty[0].name,
                    image: loadoutItemOptions.Empty[0].image,
                    isPopulated: false
                };

                const loadoutItemElements = item.loadoutItemElements;
                if (loadoutItemElements) {
                    loadoutItemElements.nameElement.innerHTML = loadoutItemOptions.Empty[0].name;
                    loadoutItemElements.imageElement.src = loadoutItemOptions.Empty[0].image;
                }
                
                updateInteractableItems(item);
            }
        });
    }
    
    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function navigateTo(currentSlotItem :LoadoutItem) {
        if (!itemsContainer || !itemSelectionContainer || !weaponSelectionContainer || !backControlPrompt || !clearAllControlPrompt) {
            console.warn("certain Containers are not defined or not available.");
            return;
        }
        if (currentSlotItem.type === LoadoutType.Empty) return;

        onSecondaryPage = true;
        itemsContainer.style.display = 'none';
        clearAllControlPrompt.style.display = 'none';
        backControlPrompt.style.display = 'flex';

        if(currentSlotItem.type === LoadoutType.Primary_Weapon || currentSlotItem.type === LoadoutType.Secondary_Weapon) {
            populateWeaponTypeItems(currentSlotItem.type);
            populateWeaponSelectionItems(currentSlotItem.type === LoadoutType.Primary_Weapon ? PrimaryWeaponType.Assault_Rifle : SecondaryWeaponType.Pistol);
            weaponSelectionContainer.style.display = 'flex';
        } else {
            populateSelectionItems(currentSlotItem);
            itemSelectionContainer.style.display = 'flex';
        }

        selectedSlot = currentSlotItem;
    }
    export function navigateBack() {
        if (!itemsContainer || !itemSelectionContainer || !weaponSelectionContainer || !backControlPrompt|| !clearAllControlPrompt) {
            console.warn("certain Containers are not defined or not available.");
            return;
        }

        onSecondaryPage = false;
        itemsContainer.style.display = 'flex';
        clearAllControlPrompt.style.display = 'flex';
        itemSelectionContainer.style.display = 'none';
        weaponSelectionContainer.style.display = 'none';
        backControlPrompt.style.display = 'none';
    }
}