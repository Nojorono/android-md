// utils/api/callplan/callPlanService.ts
import axiosInstance from "../../../config/axiosInstance";

export const getListCallPlanSchedule = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/call-plan/schedule-md/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response;
    }
}
