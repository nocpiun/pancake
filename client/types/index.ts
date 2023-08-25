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

export interface FileResponseData {
    error: object | null
    fileName: string
    fileOwner?: string
    fileExt: string
    mime: string
    data: Buffer
    size: number
}
