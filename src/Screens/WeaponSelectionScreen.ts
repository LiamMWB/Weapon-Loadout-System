namespace WeaponLoadoutSystem {
    export let weaponSelectionContainer: HTMLElement | null;
    export let weaponTypeOptionsContainer: HTMLElement | null;
    
    export let weaponSelectionItems: HTMLElement | null;
    export let weaponSelectionInfoSlotTitle: HTMLElement | null;
    export let weaponSelectionItemImg: HTMLImageElement | null;
    export let weaponSelectionItemName: HTMLElement | null;
    export let weaponSelectionItemDescription: HTMLElement | null;

    export let allWeaponTypeItems: LoadoutItem[] = [];
    export let allWeaponSelectionItems: LoadoutItem[] = [];

    // Initialization
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        weaponSelectionContainer = document.getElementById("weaponSelectionContainer");
        weaponTypeOptionsContainer = document.getElementById("weaponTypeOptionsContainer");

        weaponSelectionItems = document.getElementById("weaponSelectionItems");
        weaponSelectionInfoSlotTitle = document.getElementById("weaponSelectionInfoSlotTitle");
        weaponSelectionItemImg = document.getElementById("weaponSelectionItemImg") as HTMLImageElement;
        weaponSelectionItemName = document.getElementById("weaponSelectionItemName");
        weaponSelectionItemDescription = document.getElementById("weaponSelectionItemDescription");

        setupScreen();
    }

    function setupScreen() {
        // Generate all HTML Elements
        generateWeaponOptionTypeElements();
        generateWeaponSelectionItemElements();
        setEventListeners();
    }

    function setEventListeners() {
        allWeaponSelectionItems.forEach(item => {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("mouseenter", () => setWeaponSelectionItemDetails(item));
                item.loadoutItemElements.container.addEventListener("click", () => handleSelectionSlotInteraction(item, allWeaponSelectionItems));
            }
        });

        allWeaponTypeItems.forEach(item => {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("click", () => {
                    const slotIndex = allWeaponTypeItems.findIndex(arrayItem => arrayItem.id === item.id);
                    populateWeaponSelectionItems(allWeaponTypeItems[slotIndex].weaponType)
                });
            }
        });
    }

    export function populateWeaponTypeItems(weaponType: LoadoutType.Primary_Weapon | LoadoutType.Secondary_Weapon) {
        const currentWeaponTypeOptions = weaponType === LoadoutType.Primary_Weapon ? Object.values(PrimaryWeaponType) : Object.values(SecondaryWeaponType);

        for (let i = 0; i < allWeaponTypeItems.length; i++) {
            allWeaponTypeItems[i] = {
                ...allWeaponTypeItems[i],
                name: currentWeaponTypeOptions[i]?.toString() ?? "",
                weaponType: currentWeaponTypeOptions[i],
                isActive: currentWeaponTypeOptions[i]?.length > 0,
            };

            const loadoutItemElements = allWeaponTypeItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = allWeaponTypeItems[i].name;
                loadoutItemElements.imageElement.src = allWeaponTypeItems[i].image;
            }
        }

        allWeaponTypeItems.forEach(item => {
            if (item.loadoutItemElements) {
                const { container, imageElement } = item.loadoutItemElements;
    
                // Toggle disabled class and update visibility
                container.classList.toggle("is-Disabled", !item.isActive);
                imageElement.style.visibility = item.isPopulated ? "visible" : "hidden";
            }
        });
    }

    export function populateWeaponSelectionItems(selectedWeaponType: PrimaryWeaponType | SecondaryWeaponType | undefined) {
        if (!weaponSelectionInfoSlotTitle) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }

        const emptySlot = loadoutItemOptions[LoadoutType.Empty][0];
    
        for (let i = 0; i < allWeaponSelectionItems.length; i++) {
            let loadoutOption: LoadoutItem;

            if (Object.values(PrimaryWeaponType).includes(selectedWeaponType as PrimaryWeaponType)) {
                loadoutOption = primaryWeaponSubcategories[selectedWeaponType as PrimaryWeaponType]?.[i] || emptySlot;
            } else if (Object.values(SecondaryWeaponType).includes(selectedWeaponType as SecondaryWeaponType)) {
                loadoutOption = secondaryWeaponSubcategories[selectedWeaponType as SecondaryWeaponType]?.[i] || emptySlot;
            } else {
                console.warn("selectedWeaponType doesn't exist in PrimaryWeaponType or SecondaryWeaponType:", selectedWeaponType);
                return;
            }

            allWeaponSelectionItems[i] = {
                ...allWeaponSelectionItems[i],
                name: loadoutOption.name,
                image: loadoutOption.image,
                type: loadoutOption.type,
                isActive: loadoutOption.isActive,
                isPopulated: loadoutOption.isPopulated,
                description: loadoutOption.description,
            };

            const loadoutItemElements = allWeaponSelectionItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = allWeaponSelectionItems[i].name;
                loadoutItemElements.imageElement.src = allWeaponSelectionItems[i].image;
            }
        }
    
        allWeaponSelectionItems.forEach(item => {
            if (item.loadoutItemElements) {
                const { container, imageElement } = item.loadoutItemElements;
    
                // Toggle disabled class and update visibility
                container.classList.toggle("is-Disabled", !item.isActive);
                imageElement.style.visibility = item.isPopulated ? "visible" : "hidden";
            }
        });

        weaponSelectionInfoSlotTitle.innerHTML = `${allWeaponSelectionItems[0].type} Details`
        setWeaponSelectionItemDetails(allWeaponSelectionItems[0]);
    }

    export function setWeaponSelectionItemDetails(currentSelectionItem: LoadoutItem) {
        if (!weaponSelectionItemImg || !weaponSelectionItemName || !weaponSelectionItemDescription) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }

        const slotIndex = allWeaponSelectionItems.findIndex(item => item.id === currentSelectionItem.id);
        if (slotIndex !== -1) {
            weaponSelectionItemImg.src =  allWeaponSelectionItems[slotIndex].image;
            weaponSelectionItemName.innerHTML =  allWeaponSelectionItems[slotIndex].name;
            weaponSelectionItemDescription.innerHTML =  allWeaponSelectionItems[slotIndex].description ?? "";
        } else {
            console.warn("Slot not found in allWeaponSelectionItems.",  allWeaponSelectionItems[slotIndex]);
        }
    }
}
