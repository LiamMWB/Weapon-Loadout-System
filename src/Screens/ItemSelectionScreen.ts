namespace WeaponLoadoutSystem {
    export let itemSelectionContainer: HTMLElement | null;

    export let selectionItems: HTMLElement | null;
    export let itemSelectionSlotTitle: HTMLElement | null;
    export let itemSelectionInfoSlotTitle: HTMLElement | null;
    export let itemSelectionItemImg: HTMLImageElement | null;
    export let itemSelectionItemName: HTMLElement | null;
    export let itemSelectionItemDescription: HTMLElement | null;

    export let allSelectionItems: LoadoutItem[] = [];

    // Initialization
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        itemSelectionContainer = document.getElementById("itemSelectionContainer");
        
        selectionItems = document.getElementById("selectionItems");
        itemSelectionSlotTitle = document.getElementById("itemSelectionSlotTitle");
        itemSelectionInfoSlotTitle = document.getElementById("itemSelectionInfoSlotTitle");
        itemSelectionItemImg = document.getElementById("itemSelectionItemImg") as HTMLImageElement;
        itemSelectionItemName = document.getElementById("itemSelectionItemName");
        itemSelectionItemDescription = document.getElementById("itemSelectionItemDescription");
        
        setupScreen();
    }

    function setupScreen() {
        // Generate all HTML Elements
        generateSelectionItemElements();
        setEventListeners();
    }

    function setEventListeners() {
        allSelectionItems.forEach(item => {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("mouseenter", () => setSelectionItemDetails(item));
                item.loadoutItemElements.container.addEventListener("click", () => handleSelectionSlotInteraction(item, allSelectionItems));
            }
        });
    }

    export function populateSelectionItems(currentLoadoutItem: LoadoutItem) {
        if (!itemSelectionSlotTitle || !itemSelectionInfoSlotTitle) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }

        const emptySlot = loadoutItemOptions[LoadoutType.Empty][0];
    
        for (let i = 0; i < allSelectionItems.length; i++) {
            const loadoutOption = loadoutItemOptions[currentLoadoutItem.type]?.[i] || emptySlot;
            
            allSelectionItems[i] = {
                ...allSelectionItems[i],
                name: loadoutOption.name,
                image: loadoutOption.image,
                type: loadoutOption.type,
                isActive: loadoutOption.isActive,
                isPopulated: loadoutOption.isPopulated,
                description: loadoutOption.description || currentLoadoutItem.description,
            };

            const loadoutItemElements = allSelectionItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = allSelectionItems[i].name;
                loadoutItemElements.imageElement.src = allSelectionItems[i].image;
                loadoutItemElements.container.classList.toggle("is-Disabled", !allSelectionItems[i].isActive);
                loadoutItemElements.imageElement.style.visibility = allSelectionItems[i].isPopulated ? "visible" : "hidden";
            }
        }
    
        itemSelectionSlotTitle.innerHTML = `${allSelectionItems[0].type} Selection`
        itemSelectionInfoSlotTitle.innerHTML = `${allSelectionItems[0].type} Details`

        setSelectionItemDetails(allSelectionItems[0]);
    }

    export function setSelectionItemDetails(currentSelectionItem: LoadoutItem) {
        if (!itemSelectionItemImg || !itemSelectionItemName || !itemSelectionItemDescription) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }

        const slotIndex = allSelectionItems.findIndex(item => item.id === currentSelectionItem.id);
        if (slotIndex !== -1) {
            itemSelectionItemImg.src =  allSelectionItems[slotIndex].image;
            itemSelectionItemName.innerHTML =  allSelectionItems[slotIndex].name;
            itemSelectionItemDescription.innerHTML =  allSelectionItems[slotIndex].description ?? "";
        } else {
            console.warn("Slot not found in allSelectionItems.",  allSelectionItems[slotIndex]);
        }
    }

    export function updateEnhancementAction(wilcardType: string, enhancementName: string, shouldDisable: boolean) {
        let enhancementSlotIndex: number;

        switch (wilcardType) {
            case LoadoutType.Enhancement_01:
                enhancementSlotIndex = loadoutItemOptions["Enhancement 01"].findIndex(item => item.name === enhancementName);
                triggerEnhancement01Action(enhancementSlotIndex, shouldDisable);
                break;

            case LoadoutType.Enhancement_02:
                enhancementSlotIndex = loadoutItemOptions["Enhancement 02"].findIndex(item => item.name === enhancementName);
                triggerEnhancement02Action(enhancementSlotIndex, shouldDisable);
            break;

            case LoadoutType.Enhancement_03:
                enhancementSlotIndex = loadoutItemOptions["Enhancement 03"].findIndex(item => item.name === enhancementName);
                triggerEnhancement03Action(enhancementSlotIndex, shouldDisable);
            break;
        
            default:
                console.warn("Invalid Enhancement type");
                break;
        }
    }

    function triggerEnhancement01Action(enhancementSlotIndex: number, shouldDisable: boolean) {
        const allSecondPerkSlots = [
            allInteractableItems.find((item: LoadoutItem) => item.type === LoadoutType.Perk_01 && item.isSecondSlot),
            allInteractableItems.find((item: LoadoutItem) => item.type === LoadoutType.Perk_02 && item.isSecondSlot),
            allInteractableItems.find((item: LoadoutItem) => item.type === LoadoutType.Perk_03 && item.isSecondSlot)
        ];
    
        // Check if any perk slots are missing, exit early
        if (allSecondPerkSlots.some(perkSlot => !perkSlot)) return;
    
        // Deactivate all current active slots
        allSecondPerkSlots.forEach(perkSlot => {
            const slotIndex = allInteractableItems.findIndex(item => item.id === perkSlot?.id);
            deactivateSlot(slotIndex);
        });
    
        // Handle the specific enhancement slot
        const targetSlotIndex = allInteractableItems.findIndex(item => item.id === allSecondPerkSlots[enhancementSlotIndex]?.id);
        activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }
    
    function triggerEnhancement02Action(enhancementSlotIndex: number, shouldDisable: boolean){
        const allAttachmentPerkSlots = allInteractableItems.filter(
            (item: LoadoutItem) => item.type === LoadoutType.Attachment && item.isSecondSlot
        );
    
        // Check if any perk slots are missing, exit early
        if (allAttachmentPerkSlots.some(attachmentSlot => !attachmentSlot)) return;
    
        // Deactivate all current active slots
        allAttachmentPerkSlots.forEach(attachmentSlot => {
            const slotIndex = allInteractableItems.findIndex(item => item.id === attachmentSlot?.id);
            deactivateSlot(slotIndex);
        });
    
        // Handle the specific enhancement slot
        const targetSlotIndex = allInteractableItems.findIndex(item => item.id === allAttachmentPerkSlots[enhancementSlotIndex]?.id);
        activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }

    function triggerEnhancement03Action(enhancementSlotIndex: number, shouldDisable: boolean){
        const allEquipmentSlots = [
            allInteractableItems.find((item: LoadoutItem) => item.type === LoadoutType.Lethal && item.isSecondSlot),
            allInteractableItems.find((item: LoadoutItem) => item.type === LoadoutType.Tactical && item.isSecondSlot)
        ];
    
        // Check if any perk slots are missing, exit early
        if (allEquipmentSlots.some(equipmentSlot => !equipmentSlot)) return;
    
        // Deactivate all current active slots
        allEquipmentSlots.forEach(equipmentSlot => {
            const slotIndex = allInteractableItems.findIndex(item => item.id === equipmentSlot?.id);
            deactivateSlot(slotIndex);
        });
    
        // Handle the specific enhancement slot
        const targetSlotIndex = allInteractableItems.findIndex(item => item.id === allEquipmentSlots[enhancementSlotIndex]?.id);
        activateOrDeactivateSlot(targetSlotIndex, shouldDisable);
    }
}