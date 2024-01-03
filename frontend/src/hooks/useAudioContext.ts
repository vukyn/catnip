import { createContext, useContext } from "react";
import { ReactJkMusicPlayerAudioListProps as AudioList } from "react-jinke-music-player";

type AudioContextType = {
	audioLists: AudioList[];
	setAudioLists: React.Dispatch<React.SetStateAction<AudioList[]>>;
};

export const AudioContext = createContext<AudioContextType>({} as AudioContextType);

export const useAudioContext = () => {
	return useContext(AudioContext);
};
