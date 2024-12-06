namespace WeaponLoadoutSystem {

    function createElement(tag: string, classNames: string[] = [], innerText: string = ""): HTMLElement | HTMLImageElement {
        const element = document.createElement(tag);
        if (classNames.length) element.classList.add(...classNames);
        if (innerText) element.innerText = innerText;

        return element;
    };

    // -------------------------------------------------------------------------------------------------------------------------- \\
    
    export function generateWeaponElements() {
        if (!weaponsContainer) {
            console.error("weaponsContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        weaponsContainer.innerHTML = "";
    
        let currentWeapons: LoadoutItem[] = [];
        for (let i = 0; i < 2; i++) {
            let currentWeaponsAttachments: LoadoutItem[] = [];

            // Generate weapon elements
            const weaponContainerElement = createElement("div", ["weapon-container"]);
            const weaponElement = createElement("div", ["weapon"]);
            const weaponSlotNameElement = createElement("span", ["slot-name"], i === 0 ? "Primary" : "Secondary");
            const weaponImgElement = createElement("img") as HTMLImageElement;
            const weaponNameElement = createElement("div", ["weapon-name"]);
            
            // Generate attachment elements
            const attachmentsContainerElement = createElement("div", ["attachments"]);
            const attachmentSlotNameElement = createElement("span", ["slot-name"], "Attachments");

            let attachmentElements: HTMLElement[] = [];
            for (let k = 0; k < 2; k++) {
                const attachmentElement = createElement("div", ["attachment-container"]);
                const attachmentItemElement = createElement("div", ["attachment-item"]);
                const attachmentImgElement = createElement("img") as HTMLImageElement;
                const attachmentNameElement = createElement("div", ["attachment-name"]);

                currentWeaponsAttachments.push(
                    createLoadoutItem(
                        LoadoutType.Attachment,
                        k === 0,
                        {
                            container: attachmentItemElement,
                            imageElement: attachmentImgElement,
                            nameElement: attachmentNameElement
                        },
                        k !== 0
                    )
                )

                attachmentItemElement.append(attachmentImgElement)
                attachmentElement.append(attachmentItemElement, attachmentNameElement);
                attachmentElements.push(attachmentElement);
            }

            currentWeapons.push(
                createLoadoutItem(
                    i === 0 ? LoadoutType.Primary_Weapon : LoadoutType.Secondary_Weapon,
                    true,
                    {
                        container: weaponElement,
                        imageElement: weaponImgElement,
                        nameElement: weaponNameElement
                    },
                    undefined,
                    currentWeaponsAttachments
                )
            )

            weaponElement.append(weaponSlotNameElement, weaponImgElement, weaponNameElement);
            attachmentsContainerElement.append(attachmentSlotNameElement, ...attachmentElements)
            weaponContainerElement.append(weaponElement, attachmentsContainerElement);
    
            // Append to the main container
            weaponsContainer.append(weaponContainerElement);

            
            // Update interactable items with new attachments
            assignSelectionItemID([...currentWeaponsAttachments], allInteractableItems);
        }

        // Update interactable items with new weapons
        assignSelectionItemID([...currentWeapons], allInteractableItems);
    }    

    export function generatePerkElements() {
        if (!perksContainer) {
            console.error("perksContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        perksContainer.innerHTML = "";

        let currentPerks: LoadoutItem[] = [];
        for (let i = 0; i < 3; i++) {
            // Generate perk elements
            const perkContainerElement = createElement("div", ["perk-container"]);
            const perkSlotNameElement = createElement("span", ["slot-name"], `Perk 0${i+1}`);

            let perkElements: HTMLElement[] = [];
            for (let k = 0; k < 2; k++) {
                const perkElement = createElement("div", ["perk"]);
                const perkItemElement = createElement("div", ["perk-item"]);
                const perkImgElement = createElement("img") as HTMLImageElement;
                const perkNameElement = createElement("div", ["perk-name"]);
                const perkKey = `Perk_0${i+1}` as keyof typeof LoadoutType;

                currentPerks.push(
                    createLoadoutItem(
                        LoadoutType[perkKey],
                        k === 0,
                        {
                            container: perkItemElement,
                            imageElement: perkImgElement,
                            nameElement: perkNameElement
                        },
                        k !== 0
                    )
                )

                perkItemElement.append(perkImgElement);
                perkElement.append(perkItemElement, perkNameElement)
                perkElements.push(perkElement);
            }

            perkContainerElement.append(perkSlotNameElement, ...perkElements);

            // Append to the main container
            perksContainer.append(perkContainerElement);
        }

        // Update interactable items with new perks
        assignSelectionItemID([...currentPerks], allInteractableItems);
    }

    export function generateThrowableElements() {
        if (!throwablesContainer) {
            console.error("throwablesContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        throwablesContainer.innerHTML = "";

        let currentThrowables: LoadoutItem[] = [];
        for (let i = 0; i < 2; i++) {
            // Generate throwable elements
            const throwableContainerElement = createElement("div", ["throwable-container"]);
            const throwableSlotNameElement = createElement("span", ["slot-name"], i === 0 ? "Lethals" : "Tacticals");

            let throwableElements: HTMLElement[] = [];
            for (let k = 0; k < 1; k++) {
                const slotsElement = createElement("div", ["slots"]);

                for (let j = 0; j < 2; j++) {
                    const throwableElement = createElement("div", ["throwable"]);
                    const throwableItemElement = createElement("div", ["throwable-item"]);
                    const throwableImgElement = createElement("img") as HTMLImageElement;
                    const throwableNameElement = createElement("div", ["throwable-name"]);
    
                    currentThrowables.push(
                        createLoadoutItem(
                            i === 0 ? LoadoutType.Lethal : LoadoutType.Tactical,
                            j === 0,
                            {
                                container: throwableItemElement,
                                imageElement: throwableImgElement,
                                nameElement: throwableNameElement
                            },
                            j !== 0
                        )
                    )
    
                    throwableItemElement.append(throwableImgElement);
                    throwableElement.append(throwableItemElement, throwableNameElement)
                    slotsElement.append(throwableElement)
                }

                throwableElements.push(slotsElement);
            }

            throwableContainerElement.append(throwableSlotNameElement, ...throwableElements);

            // Append to the main container
            throwablesContainer.append(throwableContainerElement);
        }

        // Update interactable items with new perks
        assignSelectionItemID([...currentThrowables], allInteractableItems);
    }

    export function generateEnhancementElements() {
        if (!enhancementsContainer) {
            console.error("enhancementsContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        enhancementsContainer.innerHTML = "";

        let currentEnhancements: LoadoutItem[] = [];
        const enhancementSlotNameElement = createElement("span", ["slot-name"], "Enhancements");
        let enhancementElements: HTMLElement[] = [];

        for (let i = 0; i < 3; i++) {
            // Generate enhancement elements
            const enhancementContainerElement = createElement("div", ["enhancement-container"]);
            const enhancementInfoElement = createElement("div", ["enhancement-info"]);
            const enhancementTitleElement = createElement("div", ["enhancement-title"], `Enhancement 0${i+1}`);
            const enhancementImgElement = createElement("img") as HTMLImageElement;
            const enhancementKey = `Enhancement_0${i+1}` as keyof typeof LoadoutType;

            currentEnhancements.push(
                createLoadoutItem(
                    LoadoutType[enhancementKey],
                    true,
                    {
                        container: enhancementContainerElement,
                        imageElement: enhancementImgElement,
                        nameElement: enhancementTitleElement
                    }
                )
            )

            enhancementInfoElement.append(enhancementTitleElement);
            enhancementContainerElement.append(enhancementInfoElement, enhancementImgElement);
            enhancementElements.push(enhancementContainerElement);
        }
        
        // Append to the main container
        enhancementsContainer.append(enhancementSlotNameElement, ...enhancementElements);

        // Update interactable items with new perks
        assignSelectionItemID([...currentEnhancements], allInteractableItems);
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function generateSelectionItemElements() {
        if (!selectionItems) {
            console.error("selectionItems is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        selectionItems.innerHTML = "";

        let currentSelectionItems: LoadoutItem[] = [];

        for (let i = 0; i < 8; i++) {
            // Generate selection item elements
            const slotItemElement = createElement("div", ["slot-item"]);
            const slotItemImgElement = createElement("img") as HTMLImageElement;
            const slotItemNameElement = createElement("div", ["item-name"]);

            currentSelectionItems.push(
                createLoadoutItem(
                    LoadoutType.Empty,
                    false,
                    {
                        container: slotItemElement,
                        imageElement: slotItemImgElement,
                        nameElement: slotItemNameElement
                    }
                )
            )

            slotItemElement.append(slotItemImgElement, slotItemNameElement);
        
            // Append to the main container
            selectionItems.append(slotItemElement);
        }
        
        // Update selection items with new items
        assignSelectionItemID([...currentSelectionItems], allSelectionItems);
    }

    export function generateWeaponOptionTypeElements() {
        if (!weaponTypeOptionsContainer) {
            console.error("weaponTypeOptionsContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        weaponTypeOptionsContainer.innerHTML = "";

        let currentWeaponTypeItems: LoadoutItem[] = [];

        for (let i = 0; i < 5; i++) {
            // Generate selection item elements
            const slotItemElement = createElement("div", ["weapon-option-type"]);
            const slotItemImgElement = createElement("img") as HTMLImageElement;
            const slotItemNameElement = createElement("div", ["weapon-option-name"]);

            currentWeaponTypeItems.push(
                createLoadoutItem(
                    LoadoutType.Empty,
                    false,
                    {
                        container: slotItemElement,
                        imageElement: slotItemImgElement,
                        nameElement: slotItemNameElement
                    }
                )
            )

            slotItemElement.append(slotItemImgElement, slotItemNameElement);

            // Append to the main container
            weaponTypeOptionsContainer.append(slotItemElement);
        }

        // Update selection items with new items
        assignSelectionItemID([...currentWeaponTypeItems], allWeaponTypeItems);
    }

    export function generateWeaponSelectionItemElements() {
        if (!weaponSelectionItems) {
            console.error("weaponSelectionItems is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        weaponSelectionItems.innerHTML = "";

        let currentSelectionItems: LoadoutItem[] = [];

        for (let i = 0; i < 8; i++) {
            // Generate selection item elements
            const slotItemElement = createElement("div", ["slot-item"]);
            const slotItemImgElement = createElement("img") as HTMLImageElement;
            const slotItemNameElement = createElement("div", ["item-name"]);

            currentSelectionItems.push(
                createLoadoutItem(
                    LoadoutType.Empty,
                    false,
                    {
                        container: slotItemElement,
                        imageElement: slotItemImgElement,
                        nameElement: slotItemNameElement
                    }
                )
            )

            slotItemElement.append(slotItemImgElement, slotItemNameElement);
        
            // Append to the main container
            weaponSelectionItems.append(slotItemElement);
        }

        // Update selection items with new items
        assignSelectionItemID([...currentSelectionItems], allWeaponSelectionItems);
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function generateReplaceableItemElements() {
        if (!replaceableItemsContainer) {
            console.error("replaceableItemsContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        replaceableItemsContainer.innerHTML = "";

        let currentReplaceableItems: LoadoutItem[] = [];

        for (let i = 0; i < 10; i++) {
            // Generate selection item elements
            const slotItemElement = createElement("div", ["slot-item"]);
            const slotItemImgElement = createElement("img") as HTMLImageElement;
            const slotItemNameElement = createElement("div", ["item-name"]);

            currentReplaceableItems.push(
                createLoadoutItem(
                    LoadoutType.Empty,
                    false,
                    {
                        container: slotItemElement,
                        imageElement: slotItemImgElement,
                        nameElement: slotItemNameElement
                    }
                )
            )

            slotItemElement.append(slotItemImgElement, slotItemNameElement);
        
            // Append to the main container
            replaceableItemsContainer.append(slotItemElement);
        }

        
        // Update replacement items with new items
        allReplacementItems.push(...currentReplaceableItems);
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export function generateCapacityIndicators() {
        if (!capacityIndicatorContainer) {
            console.error("capacityIndicatorContainer is not defined or not available.");
            return;
        }

        // Clear any existing content in the container
        capacityIndicatorContainer.innerHTML = "";

        for (let i = 0; i < 10; i++) {
            // Generate indicators elements
            const capacityIndicatorElement = createElement("div", ["capacity-indicator"]);
            allCapacityIndicators.push(capacityIndicatorElement);
            capacityIndicatorContainer.append(capacityIndicatorElement);
        }
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\
}