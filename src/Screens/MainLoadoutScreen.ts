namespace WeaponLoadoutSystem {
    export let loadoutContainer: HTMLElement | null;
    export let loadoutControlsContainer: HTMLElement | null;
    
    export let capacityIndicatorContainer: HTMLElement | null;
    export let capacityAmountText: HTMLElement | null;

    export let itemsContainer: HTMLElement | null;
    export let weaponsContainer: HTMLElement | null;
    export let perksContainer: HTMLElement | null;
    export let throwablesContainer: HTMLElement | null;
    export let enhancementsContainer: HTMLElement | null;

    export let clearAllControlPrompt: HTMLElement | null;
    export let clearControlPrompt: HTMLElement | null;
    export let backControlPrompt: HTMLElement | null;

    export let allCapacityIndicators: HTMLElement[] = [];
    export let allInteractableItems: LoadoutItem[] = [];

    export let onSecondaryPage: boolean;
    export let selectedSlot: LoadoutItem;
    export let hoveredSlot: LoadoutItem | null;

    // Setup Key Events
    document.addEventListener("keydown", (event) => {
        if (event.key === "c" && !onSecondaryPage) {
            clearAll();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && onSecondaryPage && !overlayIsOpen) {
            navigateBack();
        }
    });

    // Initialization
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        loadoutContainer = document.getElementById("loadoutContainer");
        loadoutControlsContainer = document.getElementById("loadoutControlsContainer");

        capacityIndicatorContainer = document.getElementById("capacityIndicatorContainer");
        capacityAmountText = document.getElementById("capacityAmountText");

        itemsContainer = document.getElementById("itemsContainer");
        weaponsContainer = document.getElementById("weaponsContainer");
        perksContainer = document.getElementById("perksContainer");
        throwablesContainer = document.getElementById("throwablesContainer");
        enhancementsContainer = document.getElementById("enhancementsContainer");

        clearAllControlPrompt = document.getElementById("clearAllControlPrompt");
        clearControlPrompt = document.getElementById("clearControlPrompt");
        backControlPrompt = document.getElementById("backControlPrompt");

        setupScreen();
    }

    function setupScreen() {
        // Generate all HTML Elements
        generateCapacityIndicators();
        generateWeaponElements();
        generatePerkElements();
        generateThrowableElements();
        generateEnhancementElements();

        // Set Up Loadout
        disableNecessaryItems();
        updateCapacityIndicator();
        setEventListeners();
    }

    function setEventListeners() {
        const toggleClearControlPrompt = (isVisible: boolean) => {
            if (clearControlPrompt) {
                clearControlPrompt.style.display = isVisible ? 'flex' : 'none';
                if (!isVisible) hoveredSlot = null;
            }
        };
    
        allInteractableItems.forEach(slot => {
            if (!slot.loadoutItemElements) return;
            const container = slot.loadoutItemElements.container;
    
            container.addEventListener("click", () => navigateTo(slot));
    
            container.addEventListener("mouseenter", () => {
                const slotIndex = allInteractableItems.findIndex(item => item.id === slot.id);

                if (slotIndex !== -1) {
                    if (allInteractableItems[slotIndex].isPopulated && clearControlPrompt && clearControlPrompt.style.display === 'none') {
                        toggleClearControlPrompt(true);
                        hoveredSlot = allInteractableItems[slotIndex];
                    }
                } else {
                    console.warn("Slot not found in allInteractableItems.", allInteractableItems[slotIndex]);
                }
            });
            container.addEventListener("mouseleave", () => {
                if (clearControlPrompt && clearControlPrompt.style.display === 'flex') {
                    toggleClearControlPrompt(false);
                }
            });
    
            // Reset the slot to empty
            container.addEventListener("contextmenu", (event) => {
                event.preventDefault();
    
                if (hoveredSlot && hoveredSlot !== loadoutItemOptions.Empty[0]) {
                    const slotIndex = allInteractableItems.findIndex(item => item.id === hoveredSlot?.id);
    
                    if (slotIndex !== -1) {
                        const currentHoveredSlot = hoveredSlot;
                        clearSlot(hoveredSlot);
                        
                        if(enhancementTypes.includes(currentHoveredSlot.type)) {
                            updateEnhancementAction(currentHoveredSlot.type, currentHoveredSlot.name, true);
                        }

                        if (clearControlPrompt) {
                            clearControlPrompt.style.display = 'none';
                        }
                    } else {
                        console.warn("Slot not found in allInteractableItems.", hoveredSlot);
                    }
                }
            });
        });
    
        if (backControlPrompt) {
            backControlPrompt.addEventListener("click", () => navigateBack());
        }

        if (clearAllControlPrompt) {
            clearAllControlPrompt.addEventListener("click", () => clearAll());
        }
    }
}