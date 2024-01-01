import { createContext, useEffect, useState } from "react";
import { Layout } from "./components/V2/layout/layout";
import {
    default as MusicPlayer,
    ReactJkMusicPlayerAudioListProps as AudioList,
    TransformedDownloadAudioInfo,
    ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { Outlet } from "react-router-dom";
import { useCustomTheme } from "./components/V2/hooks/useCustomTheme";

export type AudioContextType = {
    audioLists: AudioList[];
    setAudioLists: React.Dispatch<React.SetStateAction<AudioList[]>>;
};
export const AudioContext = createContext<AudioContextType | null>(null);

const Index = () => {
    const { isDarkMode } = useCustomTheme();
    const [audioList, setAudioList] = useState<AudioList[]>([]);
    let audioInstance: ReactJkMusicPlayerInstance =
        {} as ReactJkMusicPlayerInstance;

    const onAudioListChange = (updatedList: AudioList[]) => {
        // onChange remove audio
        if (audioList.length > updatedList.length) {
            setAudioList(updatedList);
            return;
        }
    };

    const handleDownload = (audioInfo: TransformedDownloadAudioInfo) => {
        const link = document.createElement("a");
        link.href = audioInfo.src;
        link.click();
    };

    useEffect(() => {
        const onKeydown = window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                audioInstance &&
                    audioInstance.togglePlay &&
                    audioInstance.togglePlay();
            }
        });
        // @ts-ignore
        window.removeEventListener("keydown", onKeydown);
    }, []);

    useEffect(() => {}, [audioList]);

    return (
        <Layout>
            <div className="h-full">
                <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
                    <AudioContext.Provider
                        value={{
                            audioLists: audioList,
                            setAudioLists: setAudioList,
                        }}
                    >
                        <Outlet />
                    </AudioContext.Provider>
                    <MusicPlayer
                        spaceBar={true}
                        audioLists={audioList}
                        mode="full"
                        theme={isDarkMode ? "dark" : "light"}
                        showThemeSwitch={false}
                        onAudioListsChange={(_, audioList) =>
                            onAudioListChange(audioList)
                        }
                        customDownloader={handleDownload}
                        showMediaSession
                        getAudioInstance={(instance) => {
                            audioInstance = instance;
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Index;
