import { Box, Stack } from "@mui/material"
import { Ember } from "../../../emberCommunication"
import { LocalStorage } from "../../../localStorage"
import { EMBER_IMPORTED_CHALLENGE_PATH } from "../../ImportedChallengeView"
import { EmberView } from "../../emberView/EmberView"
import { Header, HeaderText } from "../../header/Header"
import { SerializedChallenge } from "../../serializedChallenge"
import { useTranslation } from "react-i18next"
import { CreatorSubHeader } from "./EditorSubHeader/CreatorSubHeader"
import { NewChallengeButton } from "./ActionButtons/NewChallengeButton"
import { DownloadButton } from "./ActionButtons/DownloadButton"
import { ReturnToEditionButtion } from "./ActionButtons/ReturnToEditButton"

const TryModeSubHeader = ({challenge}: {challenge: SerializedChallenge}) =>
    <CreatorSubHeader>
        <Box sx={{ width: "293px" }}>
            <HeaderText text={challenge.title}/>
        </Box>
        <Actions />
    </CreatorSubHeader>

const Actions = () => <>
    <ReturnToEditionButtion/>
    <Stack direction="row" alignItems={"center"}>
        <NewChallengeButton/>
        <DownloadButton/>
    </Stack>
    </>

export const CreatorTryMode = () => {
    const {t} = useTranslation('creator')

    const challengeBeingEdited: SerializedChallenge = LocalStorage.getCreatorChallenge()!

    Ember.importChallenge(challengeBeingEdited)
    
    return <>
        <Header CenterComponent={<HeaderText text={t("editor.tryModeHeader")} />} SubHeader={<TryModeSubHeader challenge={challengeBeingEdited}/>}/>
        <EmberView path={EMBER_IMPORTED_CHALLENGE_PATH}/>
    </>
}