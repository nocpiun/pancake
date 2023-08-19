export enum DirectoryItemType {
    FILE, FOLDER
}

export interface UserInfo {
    name: string
    storingToken: string
}

export interface UserInfoResponseData {
    error: object | null
    userInfo: UserInfo
}

export interface DirectoryItemData {
    name: string
    type: "directory" | "file"
    time: string
}
