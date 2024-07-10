package schema

import "net"

type Definitions struct {
	Network        map[string][]*net.IPNet `koanf:"network" json:"network" jsonschema:"title=Network Definitions" jsonschema_description:"Networks CIDR ranges that can be utilized elsewhere in the configuration."`
	UserAttributes map[string]string       `koanf:"user_attributes" json:"user_attributes" jsonschema:"title=User Attributes" jsonschema_description:"User attributes derived from others using Common Expression Language."`
}
