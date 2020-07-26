import { Construct } from "constructs";
import { TerraformBackend } from '../terraform-backend';
import { keysToSnakeCase } from "../util";
import { TerraformRemoteState, TerraformRemoteStateConfig } from "../terraform-remote-state";

export class AzurermBackend extends TerraformBackend {
    constructor(scope: Construct, private readonly props: AzurermBackendProps) {
        super(scope, "backend", "azurerm");
    }

    protected synthesizeAttributes(): { [name: string]: any } {
        return keysToSnakeCase({ ...this.props });
    }
}

export class AzurermRemoteState extends TerraformRemoteState {
    constructor(scope: Construct, id: string, private readonly props: AzurermBackendProps, config?: TerraformRemoteStateConfig) {
        super(scope, id, "azurerm", config);
    }

    protected synthesizeAttributes(): { [name: string]: any } {
        return keysToSnakeCase({ ...this.props });
    }
}

export interface AzurermBackendProps {
    readonly storageAccountName: string;
    readonly containerName: string;
    readonly key: string;
    readonly environment?: string;
    readonly endpoint?: string;
    readonly subscriptionId?: string;
    readonly tenantId?: string;
    readonly msiEndpoint?: string;
    readonly useMsi?: boolean;
    readonly sasToken?: string;
    readonly accessKey?: string;
    readonly resourceGroupName?: string;
    readonly clientId?: string;
    readonly clientSecret?: string;
}