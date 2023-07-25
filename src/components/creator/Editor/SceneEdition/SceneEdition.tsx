import { Stack } from "@mui/material";
import { SceneGrid } from "./Grid/SceneGrid";
import { SceneTools } from "./SceneTools";
import { useTranslation } from "react-i18next"
import { IncDecButtons } from "./IncDecButtons";
import { useState, useCallback, useEffect, useContext, CSSProperties } from 'react';
import { SceneMap } from "../../../serializedChallenge";
import { CreatorContext } from "../CreatorContext";

export const OBSTACLE = "O"
export const ACTOR = "A"
export const EMPTY = "-"

//Remeber to change de default scene at serializedChallenge.tsx if the inital position for Actor changes
export const INITIAL_COL = 0
export const INITIAL_ROW = 0

/**
 * If no position is given, the actor is set in the initial one (0,0)
 * @returns a map with the actor in another position.
 */
export const setActorAtPosition = (inMap: SceneMap, row = INITIAL_ROW, col = INITIAL_COL): SceneMap => {
    if (inMap[row][col] === EMPTY || inMap[row][col] === OBSTACLE) {
        inMap[row][col] = ""
    }
    inMap[row][col] = ACTOR + (inMap[row][col].length ? '&' + inMap[row][col] : '')
    return inMap
}

const includesActor = (cell: string): boolean => cell.split('&').includes(ACTOR)

const actorIsInMap = (map: SceneMap): boolean => map.some(row => row.some(includesActor))

const relocateActorIfRemoved = (map: SceneMap) => {
    if(!actorIsInMap(map)) setActorAtPosition(map)
}

type SizeProps = {
    setStyleGrid: (style: CSSProperties) => void
}

const SizeEditor = (props: SizeProps) => {
    const { t } = useTranslation("creator")

    const { map, setMap } = useContext(CreatorContext)
    const [width, setWidth] = useState('')
    
    const rows = map.length
    const columns = map[INITIAL_ROW].length

    const addColumn = () => {
        map.forEach((row, i) => map[i] = row.concat(EMPTY))

        setMap(map)
    }

    const removeColumn = () => {
        map.forEach((row) => {row.pop()})
        relocateActorIfRemoved(map)

        setMap(map)
    }

    const addRow = () => {
        map.push(map[INITIAL_ROW].slice().fill(EMPTY))

        setMap(map)
    }

    const removeRow = () => {
        map.pop()
        relocateActorIfRemoved(map)

        setMap(map)
    }

    const updateStyleGrid = useCallback(()=> {
        const widthValue = ((columns/rows)*50).toFixed(0) + '%';
        if ( width !== widthValue )
        {
            setWidth(widthValue)
            props.setStyleGrid({width: widthValue})
        }
    }, [props, width, columns, rows])

    useEffect(() => {
        updateStyleGrid()
    }, [props, updateStyleGrid]);

    
    return (
        <Stack sx={{ flexDirection: "column", height: "200px", justifyContent: "space-between", padding: "10px" }}>
            <IncDecButtons add={addColumn} remove={removeColumn} value={columns} min={1} max={12} label={t("scene.numCols")} testId="col" data-testid="map-col" />
            <IncDecButtons add={addRow} remove={removeRow} value={rows} min={1} max={10} label={t("scene.numRows")} testId="row" data-testid="map-row" />
        </Stack>
    )
}

export const SceneEdition = () => {
    const [styleGrid, setStyleGrid ] = useState<CSSProperties>({})

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <SizeEditor setStyleGrid={setStyleGrid}/>
            <SceneGrid styling={styleGrid}/>
            <SceneTools />
        </Stack>
    )
}