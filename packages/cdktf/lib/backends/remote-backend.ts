import { Construct } from "constructs";
import { TerraformBackend } from '../terraform-backend';
import { keysToSnakeCase } from "../util";
import { TerraformRemoteState, TerraformRemoteStateConfig } from "../terraform-remote-state";

export class RemoteBackend extends TerraformBackend {
    constructor(scope: Construct, private readonly props: RemoteBackendProps) {
        super(scope, "backend", "remote");
    }

    protected synthesizeAttributes(): { [name: string]: any } {
        return keysToSnakeCase({ ...this.props });
    }
}

export class TerraformCloudRemoteState extends TerraformRemoteState {
    constructor(scope: Construct, id: string, private readonly props: RemoteBackendProps, config?: TerraformRemoteStateConfig) {
        super(scope, id, "remote", config);
    }

    protected synthesizeAttributes(): { [name: string]: any } {
        return keysToSnakeCase({ ...this.props });
    }
}

export interface RemoteBackendProps {
    readonly hostname?: string;
    readonly organization: string;
    readonly token?: string;
    readonly workspaces: IRemoteWorkspace;
}

export interface IRemoteWorkspace {
    
}

export class NamedRemoteWorkspace implements IRemoteWorkspace {
    public constructor(public name: string) {}
}

export class PrefixedRemoteWorkspaces implements IRemoteWorkspace {
    public constructor(public prefix: string) {}
}