import type { CategoryEnum } from "../enums/CategoryEnum";
import type { KindEnum } from "../enums/KindEnum";

export interface TicketItemDto {
    category: CategoryEnum,
    kind: KindEnum
}