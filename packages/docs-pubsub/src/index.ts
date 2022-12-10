import { createClient } from "redis";

const CHANNEL = "docs-generator-999";

type Client = ReturnType<typeof createClient>;

export type DataType = "pages" | "footer" | "meta" | "namespaces" | "languages";

export type DataPayload = {
  payload: Record<string, any>;
  collection: string;
} & (
  | {
      event: `${string}.items.update`;
      key: string[];
    }
  | {
      event: `${string}.items.create`;
      key: string;
    }
  | {
      event: `${string}.items.delete`;
      key: string[];
      payload: never;
    }
  | {
      event: `${string}.items.sort`;
      key: never;
      item: any;
      to: any;
      payload: never;
    }
);
function publisher(client: Client) {
  return <T extends DataPayload>(type: DataType, data: T) => {
    return client.publish(
      CHANNEL,
      JSON.stringify({
        type,
        data,
      })
    );
  };
}

function subscriber(client: Client) {
  return <T>(callback: (message: { type: DataType; data: T }) => void) => {
    return client.subscribe(CHANNEL, (message) => {
      callback && callback(JSON.parse(message));
    });
  };
}

function unsubscribe(client: Client) {
  return () => client.unsubscribe(CHANNEL);
}

/**
 * Create redis client
 * @param redis If this value is not provided, the REDIS_URL env will be used instead
 */
export async function connect(redisUrl?: string) {
  const url = redisUrl || process.env.REDIS_URL;
  if (!url) {
    throw new Error("Cannot find REDIS_URL");
  }
  const client = createClient({ url });
  await client.connect();

  const pubsub = client.duplicate({ url });

  await pubsub.connect();

  return {
    publish: publisher(pubsub),
    subscribe: subscriber(pubsub),
    unsubscribe: unsubscribe(pubsub),
  };
}