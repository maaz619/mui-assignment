import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Checkbox, Container, FormControlLabel } from '@mui/material';
import { IDepartment } from '../../interfaces';
import deparment_data from "../assets/data.json"

const NestedList = () => {
    const [checked, setChecked] = React.useState<string[]>([]);
    const [data] = React.useState<IDepartment[]>([...deparment_data])
    const [openStates, setOpenStates] = React.useState<boolean[]>(
        data.map(() => false)
    );

    const toggleOpenState = (index: number) => {
        setOpenStates((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (e.target.checked) {
            setChecked((checked) => [...checked, value])
        }
        else {
            setChecked((checked) => checked.filter(option => option !== value))
        }
    }
    const handleChangeAll = (e: React.ChangeEvent<HTMLInputElement>, value: string[]) => {
        if (e.target.checked) {
            setChecked((checked) => {
                const set = new Set([...checked, ...value])
                return [...set]
            })
        }
        else {
            const superSet = [...checked]
            const subSet = [...value]
            const set = new Set([...superSet, ...subSet])
            setChecked([...set].filter(option => !value.includes(option)))
        }
    }
    const checkAllChecked = (val: string[]): boolean => {
        const superSet = [...checked]
        const subSet = [...val]
        const set = new Set([...superSet, ...subSet])
        return set.size == superSet.length
    }
    return (
        <Container component="center" sx={{ paddingTop: "2rem" }}>
            <List
                sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Departments
                    </ListSubheader>
                }
            >
                {
                    data.map((department: IDepartment, key: number) => {
                        const isOpen = openStates[key];
                        return (
                            <div key={key}>
                                <ListItemButton  >
                                    {isOpen ? <ExpandLess onClick={() => toggleOpenState(key)} /> : <ExpandMore onClick={() => toggleOpenState(key)} />}
                                    <FormControlLabel
                                        sx={{ marginX: "1rem" }}
                                        label={`${department.department} (${department.sub_departments.length})`}
                                        control={
                                            <Checkbox
                                                checked={checkAllChecked(department.sub_departments)}
                                                onChange={(e) => { handleChangeAll(e, department.sub_departments) }}
                                            />
                                        }
                                    />
                                </ListItemButton>
                                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                    <List component="div" sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 9 }}>
                                            {department.sub_departments.map((sub: string, sub_key: number) => {
                                                return (
                                                    <FormControlLabel
                                                        key={sub_key}
                                                        label={sub}
                                                        control={
                                                            <Checkbox checked={checked.includes(sub)}
                                                                onChange={(e) => { handleChange(e, sub) }}
                                                            />}
                                                    />
                                                )
                                            })}
                                        </Box>
                                    </List>
                                </Collapse>
                            </div>
                        )
                    })
                }
            </List>
        </Container>
    );
}

export default NestedList