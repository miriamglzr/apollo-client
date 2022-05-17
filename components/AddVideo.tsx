import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddToPlaylistMutation } from "../generated/graphql";
import { GET_PLAYLIST } from "../pages/playlists/[playlistId]";

interface AddVideoFormInput {
	videoId: string;
	title: string;
}

const ADD_VIDEO = gql`
	mutation addToPlaylist($playlistId: ID!, $videoId: String!, $title: String!) {
		addToPlaylist(
			input: { playlistId: $playlistId, videoId: $videoId, title: $title }
		) {
			id
			name
		}
	}
`;

export default function AddVideo({ playlistId }: { playlistId: string }) {
	const { register, handleSubmit } = useForm<AddVideoFormInput>(ADD_VIDEO);
	const [AddToPlaylist] = useMutation<AddToPlaylistMutation>(ADD_VIDEO, {
		refetchQueries: [GET_PLAYLIST],
	});

	const onSubmit: SubmitHandler<AddVideoFormInput> = (data: any) => {
		const { videoId, title } = data;
		AddToPlaylist({ variables: { playlistId, videoId, title } });

		console.log(`Adding to ${playlistId}`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("videoId")} placeholder="Video ID" />
			<input {...register("title")} placeholder="Title" />
			<button type="submit">Add</button>
		</form>
	);
}
