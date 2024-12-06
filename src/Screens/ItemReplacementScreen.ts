namespace WeaponLoadoutSystem {
    const BLUR_CLASSNAME = "blur";

    export let loadoutOverlayContainer: HTMLElement | null;
    export let replaceableItemsContainer: HTMLElement | null;
    export let overlayCancelControlPrompt: HTMLElement | null;

    export let allReplacementItems: LoadoutItem[] = [];
    export let desiredItem: LoadoutItem;

    export let overlayIsOpen: boolean;

    // Initialization
    document.addEventListener("DOMContentLoaded", init);

    // Setup Key Events
    document.addEventListener("keydown", (event) => {
        if (event.key === "c" && overlayIsOpen) {
            closeOverlay();
        }
    });

    function init() {
        loadoutOverlayContainer = document.getElementById("loadoutOverlayContainer");
        replaceableItemsContainer = document.getElementById("replaceableItemsContainer");
        overlayCancelControlPrompt = document.getElementById("overlayCancelControlPrompt");

        setupScreen();
    }

    function setupScreen() {
        // Generate all HTML Elements
        generateReplaceableItemElements();
        setEventListeners();
    }

    function setEventListeners() {
        if (overlayCancelControlPrompt) {
            overlayCancelControlPrompt.addEventListener("click", () => closeOverlay());
        }
    }

    export function populateReplaceableItems() {
        if (!loadoutContainer || !loadoutControlsContainer || !loadoutOverlayContainer) {
            console.error("some main containers are not defined or not available.");
            return;
        }

        overlayIsOpen = true;

        loadoutContainer.classList.add(BLUR_CLASSNAME);
        loadoutControlsContainer.classList.add(BLUR_CLASSNAME);
        loadoutOverlayContainer.style.display = 'flex';

        const currentSelectedItems = allInteractableItems.filter(item => item.isPopulated);

        for (let i = 0; i < allReplacementItems.length; i++) {
            const loadoutOption = currentSelectedItems[i];
            
            allReplacementItems[i] = {
                ...allReplacementItems[i],
                name: loadoutOption.name,
                image: loadoutOption.image,
                type: loadoutOption.type,
                isActive: loadoutOption.isActive,
                isPopulated: loadoutOption.isPopulated,
                id: loadoutOption.id
            };

            const loadoutItemElements = allReplacementItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = allReplacementItems[i].name;
                loadoutItemElements.imageElement.src = allReplacementItems[i].image;
                loadoutItemElements.container.addEventListener("click", () => replaceItem(allReplacementItems[i]));

                loadoutItemElements.container.classList.toggle("weapon", allReplacementItems[i].type === LoadoutType.Primary_Weapon || allReplacementItems[i].type === LoadoutType.Secondary_Weapon);
            }
        }
    }

    function replaceItem(selectedReplaceableItem: LoadoutItem) {
        const slotIndex = allInteractableItems.findIndex(item => item.id === selectedReplaceableItem.id);
        const allSelectableItemsTypes = [...allSelectionItems, ...allWeaponSelectionItems];

        if (slotIndex !== -1) {
            clearSlot(allInteractableItems[slotIndex]);
            handleSelectionSlotInteraction(desiredItem, allSelectableItemsTypes);
            
            if(enhancementTypes.includes(allInteractableItems[slotIndex].type)) {
                updateEnhancementAction(allInteractableItems[slotIndex].type, allInteractableItems[slotIndex].name, true);
            }
            
            closeOverlay();
        } else {
            console.warn("Slot not found in allInteractableItems.", hoveredSlot);
        }
    }

    function closeOverlay() {
        if (!loadoutContainer || !loadoutControlsContainer || !loadoutOverlayContainer) {
            console.error("some main containers are not defined or not available.");
            return;
        }
        
        overlayIsOpen = false;

        loadoutContainer.classList.remove(BLUR_CLASSNAME);
        loadoutControlsContainer.classList.remove(BLUR_CLASSNAME);
        loadoutOverlayContainer.style.display = 'none';
    }
}
