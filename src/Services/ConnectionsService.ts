import Roact from "@rbxts/roact";
import { RunService } from "@rbxts/services";
import { Event } from "API/Bindables/Event";
import { IdPool } from "API/IdPool";
import { CreateConnectionLine } from "Components/Connections/ConnectionLine";
import { GetMousePositionOnCanvas } from "Windows/MainWindow";
import { NodeData } from "./NodesService";

// TODO: make connOut go to multiple connIn

export interface ConnectionData {
	id: number;
	loadedId?: number;
	startNode: NodeData;
	startOffset: Vector2;
	endPos?: Vector2;
	endNode?: NodeData;
	endOffset?: Vector2;
	fn: () => number;
	onDestroy: Event;
}

interface ConnectionCollectionEntry {
	data: ConnectionData;
	create: (props: ConnectionData) => Roact.Element;
}

let movingConnectionId = -1;

const idPool = new IdPool();
const ConnectionCollection = [] as ConnectionCollectionEntry[];

export const ConnectionsChanged = new Event();

export function GetNextConnectionId(): number {
	return idPool.GetNextId();
}

export function GetAllConnections(): ConnectionCollectionEntry[] {
	return ConnectionCollection;
}

export function GetConnectionById(id: number) {
	return ConnectionCollection.find((connection) => connection.data.id === id);
}

export function CreateConnection(startNode: NodeData, startOffset: Vector2, fn: () => number, loadedId?: number) {
	const connection: ConnectionCollectionEntry = {
		data: {
			id: idPool.GetNextId(),
			loadedId,
			startNode,
			startOffset,
			fn,
			onDestroy: new Event(),
		},
		create: CreateConnectionLine,
	};

	ConnectionCollection.push(connection);
	ConnectionsChanged.Fire();

	return connection.data;
}

export function UpdateConnectionData(id: number, fn: (data: ConnectionData) => ConnectionData) {
	const connection = GetConnectionById(id);
	if (connection === undefined) {
		warn(`Failed to update connection data. Id not found`);
		return;
	}

	connection.data = fn(connection.data);
	ConnectionsChanged.Fire();
}

export function DestroyConnection(id: number) {
	const index = ConnectionCollection.findIndex((connection) => connection.data.id === id);
	if (index !== -1) {
		idPool.ReleaseId(id);

		const connection = ConnectionCollection.remove(index);
		connection!.data.onDestroy.Fire();
		ConnectionsChanged.Fire();
		return;
	}

	warn(`Failed to delete connection. Id not found`);
}

export function StartMovingConnection(id: number) {
	movingConnectionId = id;

	RunService.BindToRenderStep("MoveConnection", 200, () => {
		const mousePosition = GetMousePositionOnCanvas();

		UpdateConnectionData(movingConnectionId, (data) => {
			data.endPos = mousePosition;
			return data;
		});
	});
}

export function UnbindMovingConnection(destroyConnection = false) {
	if (movingConnectionId === -1) return;

	RunService.UnbindFromRenderStep("MoveConnection");

	if (destroyConnection) {
		DestroyConnection(movingConnectionId);
	}

	UpdateConnectionData(movingConnectionId, (data) => {
		data.endPos = undefined;
		return data;
	});

	movingConnectionId = -1;
}

export function GetMovingConnectionId() {
	return movingConnectionId;
}
