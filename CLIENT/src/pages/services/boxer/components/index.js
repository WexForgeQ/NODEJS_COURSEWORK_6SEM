import { BoxerProfile } from "./BoxerProfile";
import { BoxerCalculator } from "./BoxersCalculator"
import { BoxerHome } from "./BoxerHome";
import { BoxerHelp } from "./BoxerHelp";

export const BOXER_SIDEBAR_ITEM_NAMES = {
    profile: "boxer-sidebar-profile-name",
    calculator: "boxer-sidebar-calculator-name",
    home: "boxer-sidebar-home-name",
    info: "boxer-sidebar-info-name"
}

export const BOXER_COMPONENTS_MAP = new Map([
    [BOXER_SIDEBAR_ITEM_NAMES.profile, <BoxerProfile />],
    [BOXER_SIDEBAR_ITEM_NAMES.calculator, <BoxerCalculator />],
    [BOXER_SIDEBAR_ITEM_NAMES.home, <BoxerHome />],
    [BOXER_SIDEBAR_ITEM_NAMES.info, <BoxerHelp />]
])

