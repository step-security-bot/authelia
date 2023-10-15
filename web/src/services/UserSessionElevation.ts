import axios from "axios";

import {
    ErrorResponse,
    OKResponse,
    ServiceResponse,
    UserSessionElevationPath,
    hasServiceError,
    toData,
} from "@services/Api";

export interface UserSessionElevationData {
    elevated: boolean;
    expires: number;
    delete_id: string;
}

export interface UserSessionElevationGenerateData {
    delete_id: string;
}

export async function getUserSessionElevation() {
    const res = await axios<ServiceResponse<UserSessionElevationData>>({
        method: "GET",
        url: UserSessionElevationPath,
    });

    if (res.status !== 200 || hasServiceError(res).errored) {
        throw new Error(
            `Failed POST to ${UserSessionElevationPath}. Code: ${res.status}. Message: ${hasServiceError(res).message}`,
        );
    }

    return toData<UserSessionElevationData>(res);
}

export async function generateUserSessionElevation() {
    const res = await axios<ServiceResponse<UserSessionElevationGenerateData>>({
        method: "POST",
        url: UserSessionElevationPath,
    });

    if (res.status !== 200 || hasServiceError(res).errored) {
        throw new Error(
            `Failed POST to ${UserSessionElevationPath}. Code: ${res.status}. Message: ${hasServiceError(res).message}`,
        );
    }

    return toData<UserSessionElevationGenerateData>(res);
}

export async function verifyUserSessionElevation(otc: string) {
    const res = await axios<OKResponse | ErrorResponse>({
        method: "PUT",
        url: UserSessionElevationPath,
        data: { otc: otc },
        validateStatus: (status) => {
            return status === 401 || (status >= 200 && status < 400);
        },
    });

    return res.status === 200 && res.data.status === "OK";
}

export async function deleteUserSessionElevation(deleteID: string) {
    const res = await axios<OKResponse | ErrorResponse>({
        method: "DELETE",
        url: `${UserSessionElevationPath}/${deleteID}`,
    });

    return res.status === 200 && res.data.status === "OK";
}