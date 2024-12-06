namespace WeaponLoadoutSystem {
    export interface LoadoutItem {
        name: string;
        image: string;
        type: LoadoutType;
        isActive: boolean;
        isPopulated: boolean;
        loadoutItemElements?: LoadoutItemElements; 
        isSecondSlot?: boolean;
        attachments?: LoadoutItem[];
        description?: string;
        id?: number;
        weaponType?: PrimaryWeaponType | SecondaryWeaponType;
    }

    // References to HTML elements
    export interface LoadoutItemElements {
        container: HTMLElement;
        imageElement: HTMLImageElement;
        nameElement: HTMLElement;
    }

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export enum LoadoutType {
        Primary_Weapon = "Primary Weapon",
        Secondary_Weapon = "Secondary Weapon",
        Attachment = "Attachment",
        Perk_01 = "Perk 01",
        Perk_02 = "Perk 02",
        Perk_03 = "Perk 03",
        Lethal = "Lethal",
        Tactical = "Tactical",
        Enhancement_01 = "Enhancement 01",
        Enhancement_02 = "Enhancement 02",
        Enhancement_03 = "Enhancement 03",
        Empty = "Empty"
    }

    export enum PrimaryWeaponType {
        Assault_Rifle = "Assault Rifles",
        Submachine_Gun = "Submachine Guns",
        Sniper = "Snipers"
    }

    export enum SecondaryWeaponType {
        Pistol = "Pistols",
        Shotgun = "Shotguns"
    }

    export const enhancementTypes = [
        LoadoutType.Enhancement_01,
        LoadoutType.Enhancement_02,
        LoadoutType.Enhancement_03,
    ];

    // -------------------------------------------------------------------------------------------------------------------------- \\

    export const loadoutItemOptions: Record<LoadoutType, LoadoutItem[]> = {
        [LoadoutType.Primary_Weapon]: [
            // Handled Elsewhere
        ],
        [LoadoutType.Secondary_Weapon]: [
            // Handled Elsewhere
        ],
        [LoadoutType.Attachment]: [
            {
                name: "Quick Draw",
                image: "assets/attachments/quick_draw.png",
                type: LoadoutType.Attachment,
                isActive: true,
                isPopulated: true,
                description: "Reduces aim-down-sight time, allowing for faster weapon deployment in critical moments."
            },{
                name: "Grip",
                image: "assets/attachments/grip.png",
                type: LoadoutType.Attachment,
                isActive: true,
                isPopulated: true,
                description: "Improves weapon stability and reduces recoil, providing better control during sustained fire."
            },{
                name: "Suppressor",
                image: "assets/attachments/suppressor.png",
                type: LoadoutType.Attachment,
                isActive: true,
                isPopulated: true,
                description: "Reduces weapon noise and muzzle flash, making it harder for enemies to locate your position."
            },{
                name: "Extended Clip",
                image: "assets/attachments/extended_clip.png",
                type: LoadoutType.Attachment,
                isActive: true,
                isPopulated: true,
                description: "Increases magazine capacity, allowing for more shots before needing to reload."
            },{
                name: "Extended Barrel",
                image: "assets/attachments/extended_barrel.png",
                type: LoadoutType.Attachment,
                isActive: true,
                isPopulated: true,
                description: "Enhances bullet velocity and effective range, making it ideal for engaging distant targets."
            }
        ],        
        [LoadoutType.Perk_01]: [
            {
                name: "Adrenaline Rush",
                image: "assets/perks/01_perks/perk_01.png",
                type: LoadoutType.Perk_01,
                isActive: true,
                isPopulated: true,
                description: "Temporarily increase sprint speed and stamina after achieving a kill."
            },{
                name: "Hardline",
                image: "assets/perks/01_perks/perk_02.png",
                type: LoadoutType.Perk_01,
                isActive: true,
                isPopulated: true,
                description: "Reduce the cost of killstreak rewards, allowing for quicker deployment of support."
            },{
                name: "Survivalist",
                image: "assets/perks/01_perks/perk_03.png",
                type: LoadoutType.Perk_01,
                isActive: true,
                isPopulated: true,
                description: "Reduce explosive damage and increase resistance to environmental hazards."
            }
        ],
        [LoadoutType.Perk_02]: [
            {
                name: "Cold Blooded",
                image: "assets/perks/02_perks/perk_01.png",
                type: LoadoutType.Perk_02,
                isActive: true,
                isPopulated: true,
                description: "Avoid detection from enemy targeting systems and thermal optics."
            },{
                name: "Tracker",
                image: "assets/perks/02_perks/perk_02.png",
                type: LoadoutType.Perk_02,
                isActive: true,
                isPopulated: true,
                description: "See enemy footprints and track their movements, gaining an advantage in pursuit."
            },{
                name: "Battle Hardened",
                image: "assets/perks/02_perks/perk_03.png",
                type: LoadoutType.Perk_02,
                isActive: true,
                isPopulated: true,
                description: "Reduce the duration of enemy flashbangs, stuns, and EMP effects."
            }
        ],
        [LoadoutType.Perk_03]: [
            {
                name: "Stealth Operative",
                image: "assets/perks/03_perks/perk_01.png",
                type: LoadoutType.Perk_03,
                isActive: true,
                isPopulated: true,
                description: "Move silently and avoid detection by enemy UAVs."
            },{
                name: "Quick Recovery",
                image: "assets/perks/03_perks/perk_02.png",
                type: LoadoutType.Perk_03,
                isActive: true,
                isPopulated: true,
                description: "Increase health regeneration speed after taking damage."
            },{
                name: "Combat Ready",
                image: "assets/perks/03_perks/perk_03.png",
                type: LoadoutType.Perk_03,
                isActive: true,
                isPopulated: true,
                description: "Swap weapons faster and reduce equipment deployment time."
            }
        ],
        [LoadoutType.Lethal]: [
            {
                name: "Grenade",
                image: "assets/lethals/grenade.png",
                type: LoadoutType.Lethal,
                isActive: true,
                isPopulated: true,
                description: "A classic explosive device that detonates after a short delay, dealing damage to all enemies in the blast radius."
            },{
                name: "Semtex",
                image: "assets/lethals/semtex.png",
                type: LoadoutType.Lethal,
                isActive: true,
                isPopulated: true,
                description: "A sticky explosive that adheres to surfaces or enemies, detonating after a fixed timer."
            },{
                name: "Throwing Knife",
                image: "assets/lethals/throwing_knife.png",
                type: LoadoutType.Lethal,
                isActive: true,
                isPopulated: true,
                description: "A high-speed, reusable blade that eliminates targets on contact with precision."
            },{
                name: "C4",
                image: "assets/lethals/c4.png",
                type: LoadoutType.Lethal,
                isActive: true,
                isPopulated: true,
                description: "A remotely detonated plastic explosive, ideal for ambushing or clearing groups of enemies."
            },{
                name: "Claymore",
                image: "assets/lethals/claymore.png",
                type: LoadoutType.Lethal,
                isActive: true,
                isPopulated: true,
                description: "A motion-activated explosive device that detonates in a frontal arc when triggered by enemy movement."
            }
        ],        
        [LoadoutType.Tactical]: [
            {
                name: "Flashbang",
                image: "assets/tacticals/flashbang.png",
                type: LoadoutType.Tactical,
                isActive: true,
                isPopulated: true,
                description: "A non-lethal grenade that temporarily blinds and deafens enemies within its blast radius, disorienting them."
            },{
                name: "Concussion",
                image: "assets/tacticals/concussion.png",
                type: LoadoutType.Tactical,
                isActive: true,
                isPopulated: true,
                description: "A device that slows enemy movement and reduces their ability to aim, giving you the upper hand in combat."
            },{
                name: "Smoke Grenade",
                image: "assets/tacticals/smoke_grenade.png",
                type: LoadoutType.Tactical,
                isActive: true,
                isPopulated: true,
                description: "Releases a thick cloud of smoke, obscuring vision and creating opportunities for stealth or escape."
            },{
                name: "Tactical Insertion",
                image: "assets/tacticals/tactical_insertion.png",
                type: LoadoutType.Tactical,
                isActive: true,
                isPopulated: true,
                description: "Allows you to mark a location as your respawn point, giving you control over where you re-enter the battlefield."
            }
        ],        
        [LoadoutType.Enhancement_01]: [
            {
                name: "Extra Perk 01",
                image: "assets/enhancements/enhancement_01.png",
                type: LoadoutType.Enhancement_01,
                isActive: true,
                isPopulated: true,
                description: "Allows you to equip an additional Perk in the Perk 01 slot, enhancing your strategic options."
            },{
                name: "Extra Perk 02",
                image: "assets/enhancements/enhancement_01.png",
                type: LoadoutType.Enhancement_01,
                isActive: true,
                isPopulated: true,
                description: "Allows you to equip an additional Perk in the Perk 02 slot, giving you an edge in versatility."
            },{
                name: "Extra Perk 03",
                image: "assets/enhancements/enhancement_01.png",
                type: LoadoutType.Enhancement_01,
                isActive: true,
                isPopulated: true,
                description: "Allows you to equip an additional Perk in the Perk 03 slot, broadening your tactical options."
            }
        ],
        [LoadoutType.Enhancement_02]: [
            {
                name: "Extra Primary Attachment",
                image: "assets/enhancements/enhancement_02.png",
                type: LoadoutType.Enhancement_02,
                isActive: true,
                isPopulated: true,
                description: "Grants an additional attachment slot for your primary weapon, increasing its versatility."
            },{
                name: "Extra Secondary Attachment",
                image: "assets/enhancements/enhancement_02.png",
                type: LoadoutType.Enhancement_02,
                isActive: true,
                isPopulated: true,
                description: "Grants an additional attachment slot for your secondary weapon, boosting its effectiveness."
            }
        ],
        [LoadoutType.Enhancement_03]: [
            {
                name: "Extra Lethal",
                image: "assets/enhancements/enhancement_03.png",
                type: LoadoutType.Enhancement_03,
                isActive: true,
                isPopulated: true,
                description: "Allows you to carry an additional Lethal item, increasing your offensive potential."
            },{
                name: "Extra Tactical",
                image: "assets/enhancements/enhancement_03.png",
                type: LoadoutType.Enhancement_03,
                isActive: true,
                isPopulated: true,
                description: "Allows you to carry an additional Tactical item, expanding your utility in the field."
            }
        ],
        [LoadoutType.Empty]: [
            {
                name: "",
                image: "",
                type: LoadoutType.Empty,
                isActive: false,
                isPopulated: false
            }
        ]
    };

    // -------------------------------------------------------------------------------------------------------------------------- \\

    const assaultRifles: LoadoutItem[] = [
        {
            name: "AK47",
            image: "assets/guns/assault_rifles/assault_rifle_01.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A reliable and versatile assault rifle known for its high damage and effective range, with manageable recoil."
        }, {
            name: "M16",
            image: "assets/guns/assault_rifles/assault_rifle_02.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A burst-fire assault rifle with exceptional accuracy and consistent damage at medium to long range."
        }, {
            name: "Scar",
            image: "assets/guns/assault_rifles/assault_rifle_03.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A heavy assault rifle delivering high damage and superior accuracy, ideal for mid-range combat."
        }
    ];
    
    const submachineGuns: LoadoutItem[] = [
        {
            name: "UZI",
            image: "assets/guns/submachine_guns/submachine_gun_01.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A compact SMG with high fire rate, excelling in close-quarters combat despite its lower accuracy at range."
        }, {
            name: "MP5K",
            image: "assets/guns/submachine_guns/submachine_gun_02.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A lightweight and mobile SMG, offering rapid fire and control in tight engagements."
        }, {
            name: "MP5",
            image: "assets/guns/submachine_guns/submachine_gun_03.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A well-rounded SMG with moderate damage and excellent handling, perfect for versatile close-range combat."
        }
    ];
    
    const snipers: LoadoutItem[] = [
        {
            name: "Dragunov",
            image: "assets/guns/sniper_rifles/sniper_rifle_01.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A semi-automatic sniper rifle with fast follow-up shots, sacrificing some power for rate of fire."
        }, {
            name: "AWP",
            image: "assets/guns/sniper_rifles/sniper_rifle_02.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A powerful bolt-action sniper rifle delivering one-shot kills to most body parts at long range."
        }, {
            name: "Barrett 50cal",
            image: "assets/guns/sniper_rifles/sniper_rifle_03.png",
            type: LoadoutType.Primary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "An anti-material sniper rifle with devastating power, ideal for extreme range and heavy targets."
        }
    ];
    
    const pistols: LoadoutItem[] = [
        {
            name: "Magnum",
            image: "assets/guns/pistols/pistol_01.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A high-caliber revolver with exceptional damage, effective for precision shots in close quarters."
        }, {
            name: "M1911",
            image: "assets/guns/pistols/pistol_02.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A classic semi-automatic pistol offering reliable damage and accuracy for backup situations."
        }, {
            name: "Beretta",
            image: "assets/guns/pistols/pistol_03.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A versatile and fast-firing pistol, providing consistent performance in secondary engagements."
        }
    ];
    
    const shotguns: LoadoutItem[] = [
        {
            name: "Remington 870",
            image: "assets/guns/shotguns/shotgun_01.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A pump-action shotgun delivering high damage and reliability in close-range combat."
        }, {
            name: "Mossberg 500",
            image: "assets/guns/shotguns/shotgun_02.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A durable and versatile shotgun with a solid balance of damage and handling."
        }, {
            name: "Lever-Action",
            image: "assets/guns/shotguns/shotgun_03.png",
            type: LoadoutType.Secondary_Weapon,
            isActive: true,
            isPopulated: true,
            description: "A lever-action shotgun with powerful shots and a unique handling style for close-quarters dominance."
        }
    ];

    export const primaryWeaponSubcategories: Record<PrimaryWeaponType, LoadoutItem[]> = {
        [PrimaryWeaponType.Assault_Rifle]: assaultRifles,
        [PrimaryWeaponType.Submachine_Gun]: submachineGuns,
        [PrimaryWeaponType.Sniper]: snipers
    };

    export const secondaryWeaponSubcategories: Record<SecondaryWeaponType, LoadoutItem[]> = {
        [SecondaryWeaponType.Pistol]: pistols,
        [SecondaryWeaponType.Shotgun]: shotguns,
    };
}