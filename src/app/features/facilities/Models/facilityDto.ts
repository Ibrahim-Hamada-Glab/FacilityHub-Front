
export interface FacilityDto {

}

export interface FacilityViewDto {
    id: string;
    name: string;
    code: string;
    address: string;
    city: string;
    type: number;
    totalFloors?: number;
    totalArea: number;
    status: number;
    imageUrl: string;
    managerName?: string;
    equimentsCount?: number;
    workOrdersCount?: number;
}

 
 
export const FacilityStatus: Record<number, string>= {
    1: "Active",
    2: "Inactive",
    3: "Under Maintenance"
  };
  export const FacilityType: Record<number, string> = {
    1: "Office",
    2: "Factory",
    3: "Warehouse",
    4: "School",
    5: "Hospital",
    6: "Hotel",
    7: "Restaurant",
    8: "Other"
  };
  //
   