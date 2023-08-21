export interface IUser {
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IPost {
    title: string;
    id: number;
    body: string;
    userId: number;
}
export interface IColumn {
    field: string;
    headerName: string;
    width: number;
    editable?: boolean;
}

export interface IDepartment {
    department: string;
    sub_departments: string[];
}