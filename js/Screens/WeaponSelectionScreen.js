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
    WeaponLoadoutSystem.allWeaponTypeItems = [];
    WeaponLoadoutSystem.allWeaponSelectionItems = [];
    document.addEventListener("DOMContentLoaded", init);
    function init() {
        WeaponLoadoutSystem.weaponSelectionContainer = document.getElementById("weaponSelectionContainer");
        WeaponLoadoutSystem.weaponTypeOptionsContainer = document.getElementById("weaponTypeOptionsContainer");
        WeaponLoadoutSystem.weaponSelectionItems = document.getElementById("weaponSelectionItems");
        WeaponLoadoutSystem.weaponSelectionInfoSlotTitle = document.getElementById("weaponSelectionInfoSlotTitle");
        WeaponLoadoutSystem.weaponSelectionItemImg = document.getElementById("weaponSelectionItemImg");
        WeaponLoadoutSystem.weaponSelectionItemName = document.getElementById("weaponSelectionItemName");
        WeaponLoadoutSystem.weaponSelectionItemDescription = document.getElementById("weaponSelectionItemDescription");
        setupScreen();
    }
    function setupScreen() {
        WeaponLoadoutSystem.generateWeaponOptionTypeElements();
        WeaponLoadoutSystem.generateWeaponSelectionItemElements();
        setEventListeners();
    }
    function setEventListeners() {
        WeaponLoadoutSystem.allWeaponSelectionItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("mouseenter", function () { return setWeaponSelectionItemDetails(item); });
                item.loadoutItemElements.container.addEventListener("click", function () { return WeaponLoadoutSystem.handleSelectionSlotInteraction(item, WeaponLoadoutSystem.allWeaponSelectionItems); });
            }
        });
        WeaponLoadoutSystem.allWeaponTypeItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                item.loadoutItemElements.container.addEventListener("click", function () {
                    var slotIndex = WeaponLoadoutSystem.allWeaponTypeItems.findIndex(function (arrayItem) { return arrayItem.id === item.id; });
                    populateWeaponSelectionItems(WeaponLoadoutSystem.allWeaponTypeItems[slotIndex].weaponType);
                });
            }
        });
    }
    function populateWeaponTypeItems(weaponType) {
        var _a, _b, _c;
        var currentWeaponTypeOptions = weaponType === WeaponLoadoutSystem.LoadoutType.Primary_Weapon ? Object.values(WeaponLoadoutSystem.PrimaryWeaponType) : Object.values(WeaponLoadoutSystem.SecondaryWeaponType);
        for (var i = 0; i < WeaponLoadoutSystem.allWeaponTypeItems.length; i++) {
            WeaponLoadoutSystem.allWeaponTypeItems[i] = __assign(__assign({}, WeaponLoadoutSystem.allWeaponTypeItems[i]), { name: (_b = (_a = currentWeaponTypeOptions[i]) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "", weaponType: currentWeaponTypeOptions[i], isActive: ((_c = currentWeaponTypeOptions[i]) === null || _c === void 0 ? void 0 : _c.length) > 0 });
            var loadoutItemElements = WeaponLoadoutSystem.allWeaponTypeItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.allWeaponTypeItems[i].name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.allWeaponTypeItems[i].image;
            }
        }
        WeaponLoadoutSystem.allWeaponTypeItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                var _a = item.loadoutItemElements, container = _a.container, imageElement = _a.imageElement;
                container.classList.toggle("is-Disabled", !item.isActive);
                imageElement.style.visibility = item.isPopulated ? "visible" : "hidden";
            }
        });
    }
    WeaponLoadoutSystem.populateWeaponTypeItems = populateWeaponTypeItems;
    function populateWeaponSelectionItems(selectedWeaponType) {
        var _a, _b;
        if (!WeaponLoadoutSystem.weaponSelectionInfoSlotTitle) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }
        var emptySlot = WeaponLoadoutSystem.loadoutItemOptions[WeaponLoadoutSystem.LoadoutType.Empty][0];
        for (var i = 0; i < WeaponLoadoutSystem.allWeaponSelectionItems.length; i++) {
            var loadoutOption = void 0;
            if (Object.values(WeaponLoadoutSystem.PrimaryWeaponType).includes(selectedWeaponType)) {
                loadoutOption = ((_a = WeaponLoadoutSystem.primaryWeaponSubcategories[selectedWeaponType]) === null || _a === void 0 ? void 0 : _a[i]) || emptySlot;
            }
            else if (Object.values(WeaponLoadoutSystem.SecondaryWeaponType).includes(selectedWeaponType)) {
                loadoutOption = ((_b = WeaponLoadoutSystem.secondaryWeaponSubcategories[selectedWeaponType]) === null || _b === void 0 ? void 0 : _b[i]) || emptySlot;
            }
            else {
                console.warn("selectedWeaponType doesn't exist in PrimaryWeaponType or SecondaryWeaponType:", selectedWeaponType);
                return;
            }
            WeaponLoadoutSystem.allWeaponSelectionItems[i] = __assign(__assign({}, WeaponLoadoutSystem.allWeaponSelectionItems[i]), { name: loadoutOption.name, image: loadoutOption.image, type: loadoutOption.type, isActive: loadoutOption.isActive, isPopulated: loadoutOption.isPopulated, description: loadoutOption.description });
            var loadoutItemElements = WeaponLoadoutSystem.allWeaponSelectionItems[i].loadoutItemElements;
            if (loadoutItemElements) {
                loadoutItemElements.nameElement.innerHTML = WeaponLoadoutSystem.allWeaponSelectionItems[i].name;
                loadoutItemElements.imageElement.src = WeaponLoadoutSystem.allWeaponSelectionItems[i].image;
            }
        }
        WeaponLoadoutSystem.allWeaponSelectionItems.forEach(function (item) {
            if (item.loadoutItemElements) {
                var _a = item.loadoutItemElements, container = _a.container, imageElement = _a.imageElement;
                container.classList.toggle("is-Disabled", !item.isActive);
                imageElement.style.visibility = item.isPopulated ? "visible" : "hidden";
            }
        });
        WeaponLoadoutSystem.weaponSelectionInfoSlotTitle.innerHTML = "".concat(WeaponLoadoutSystem.allWeaponSelectionItems[0].type, " Details");
        setWeaponSelectionItemDetails(WeaponLoadoutSystem.allWeaponSelectionItems[0]);
    }
    WeaponLoadoutSystem.populateWeaponSelectionItems = populateWeaponSelectionItems;
    function setWeaponSelectionItemDetails(currentSelectionItem) {
        var _a;
        if (!WeaponLoadoutSystem.weaponSelectionItemImg || !WeaponLoadoutSystem.weaponSelectionItemName || !WeaponLoadoutSystem.weaponSelectionItemDescription) {
            console.warn("certain selection elements are not defined or not available.");
            return;
        }
        var slotIndex = WeaponLoadoutSystem.allWeaponSelectionItems.findIndex(function (item) { return item.id === currentSelectionItem.id; });
        if (slotIndex !== -1) {
            WeaponLoadoutSystem.weaponSelectionItemImg.src = WeaponLoadoutSystem.allWeaponSelectionItems[slotIndex].image;
            WeaponLoadoutSystem.weaponSelectionItemName.innerHTML = WeaponLoadoutSystem.allWeaponSelectionItems[slotIndex].name;
            WeaponLoadoutSystem.weaponSelectionItemDescription.innerHTML = (_a = WeaponLoadoutSystem.allWeaponSelectionItems[slotIndex].description) !== null && _a !== void 0 ? _a : "";
        }
        else {
            console.warn("Slot not found in allWeaponSelectionItems.", WeaponLoadoutSystem.allWeaponSelectionItems[slotIndex]);
        }
    }
    WeaponLoadoutSystem.setWeaponSelectionItemDetails = setWeaponSelectionItemDetails;
})(WeaponLoadoutSystem || (WeaponLoadoutSystem = {}));
