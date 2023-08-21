import { Button } from "@mui/material"
import { getData } from "../../service"
import { useEffect, useState } from "react"
import { IPost, IColumn } from "../../interfaces"
import { DataGrid } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import NestedList from "../components/collapsable"

const columns: IColumn[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'USER ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: false,
    },
    {
        field: 'body',
        headerName: 'Post',
        width: 550,
        editable: false,
    }
];
const isLoggedIn = (): boolean => {
    const isUser = localStorage.getItem('currentUser');
    if (isUser) return true;
    return false
}
const List = () => {

    const [postssData, setPostsData] = useState<IPost[]>([])
    const [spin, setSpin] = useState<boolean>(false)

    const navigate = useNavigate()

    const get = async () => {
        try {
            setSpin(true)
            const res = await getData()
            const result = await res.json()
            if (res.ok && result.length) {
                setPostsData(result)
                setSpin(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get()
        if (!isLoggedIn()) {
            return navigate({ pathname: "/", hash: "redirect" })
        }
    }, [])

    return (
        <>
            <Button variant="contained" color="primary" onClick={get} children={"fetch again"} />
            <DataGrid
                loading={spin}
                rows={postssData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                autoHeight
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick

            />
            <NestedList />
        </>
    )
}

export default List