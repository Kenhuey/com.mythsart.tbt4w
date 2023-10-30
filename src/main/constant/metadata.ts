/*
 * Reflect Metadata types
 */
export namespace MetadataType {
    /*
     * Object type
     */
    export const DESIGN_TYPE: string = "design:type" as const;

    /*
     * Object param types
     */
    export const DESIGN_PARAMTYPES: string = "design:paramtypes" as const;

    /*
     * Object return types
     */
    export const DESIGN_RETURNTYPES: string = "design:returntype" as const;
}
