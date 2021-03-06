declare module "soundcloud-scraper" {
  import m3u8stream from "m3u8stream";
  import { RequestOptions, IncomingMessage } from "http";
  import { RequestInfo, RequestInit, Response } from "node-fetch";
  import { load as CherrioLoad } from "cheerio";
  import { Readable } from "stream";

  export interface SimpleJSON {
    [s: string]: any;
  }

  export interface ClientOptions {
    fetchAPIKey?: boolean;
  }

  export class Client {
    constructor(API_KEY?: string, ClientOptions?: ClientOptions);
    public API_KEY: string;
    public readonly options: ClientOptions;
    public apiVersion(force?: boolean): Promise<string | null>;
    public getSongInfo(
      url: string,
      options?: {
        fetchEmbed: boolean;
        fetchComments: boolean;
        fetchStreamURL: boolean;
      }
    ): Promise<Song>;
    public getPlaylist(url: string, options?: PlaylistParseOptions): Promise<Playlist>;
    public search(
      query: string,
      type?: "all" | "artist" | "playlist" | "track"
    ): Promise<SearchResult[]>;
    public getUser(username: string): Promise<UserInfo>;
    public getEmbed(embedURL: string): Promise<Embed>;
    public createAPIKey(KEY?: string | null, fetch?: boolean): Promise<void>;
    public fetchStreamURL(trackURL: string): Promise<string | null>;
  }

  export const Constants: SimpleJSON;
  export const Store: Map<any, any>;
  export const version: string;

  export function validateURL(url?: string): boolean;
  export function keygen(force?: boolean): Promise<string | null>;
  export class Util {
    static last(arr?: any[]): any;
    static validateURL: typeof validateURL;
    static request(url?: RequestInfo, options?: RequestInit): Promise<Response>;
    static parseHTML(url?: RequestInfo, options?: RequestInit): Promise<string>;
    static loadHTML(html?: string | null): ReturnType<typeof CherrioLoad>;
    static parseDuration(duration: string): number;
    static parseComments(commentSection: string): Comment[];
    static fetchSongStreamURL(
      songURL: string,
      clientID: string | null
    ): Promise<string>;
    static keygen: typeof keygen;
  }

  export function downloadHLS(
    url: string,
    options?: m3u8stream.Options
  ): Promise<m3u8stream.Stream>;
  export function downloadProgressive(
    url: string,
    options?: RequestOptions
  ): Promise<Readable>;
  export class StreamDownloader {
    static downloadHLS: typeof downloadHLS;
    static downloadProgressive: typeof downloadProgressive;
  }

  export class Embed {
    constructor(data: object, embedURL?: string | null);
    url: string;
    version: number;
    type: string;
    provider: {
      name: string;
      url: string;
    };
    height: number;
    width: number;
    title: string;
    description: string;
    author: {
      name: string;
      url: string;
    };
    thumbnailURL: string;
    visualizer: string;
    toHTML(): string;
    toJSON(): SimpleJSON;
    toString(): string;
  }

  export interface SongAuthor {
    name: string;
    username: string;
    url: string;
    avatarURL: string;
    urn: number;
    verified: boolean;
    followers: number;
    following: number;
  }

  export interface Comment {
    text: string;
    createdAt: Date;
    author: {
      name: string;
      username: string;
      url: string;
    };
  }

  export interface SongData {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    duration: number;
    playCount: string;
    commentsCount: string;
    likes: string;
    genre: string;
    author: SongAuthor;
    publishedAt: Date;
    embedURL: string;
    embed: Embed | null;
    track: {
      hls: string;
      progressive: string;
    };
    trackURL: string;
    streamURL: string;
    comments: Comment[];
  }

  export class Song {
    constructor(data: SimpleJSON);
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    duration: number;
    playCount: number;
    commentsCount: number;
    likes: number;
    genre: string;
    author: SongAuthor;
    publishedAt: Date;
    embedURL: string;
    embed: Embed;
    streams: {
      hls: string;
      progressive: string;
    };
    trackURL: string;
    comments: Comment[];
    streamURL: string;
    age: number;
    publishedTimestamp: number;
    downloadHLS: typeof downloadHLS;
    downloadProgressive: typeof downloadProgressive;
    toString(): string;
    toJSON(): SongData;
  }

  export interface PlaylistParseOptions {
    fetchEmbed?: boolean;
  }

  export interface Playlist {
    id: number;
    title: string;
    url: string;
    description: string;
    thumbnail: string;
    author: {
      name: string;
      username: string;
      urn: number;
      profile: string;
    };
    embedURL: string;
    embed: Embed | null;
    genre: string;
    trackCount: number;
    tracks: any[];
  }

  export interface SearchResult {
    index: number;
    artist: string | null;
    url: string;
    itemName: string;
    name: string;
    type: "track" | "artist" | "playlist" | "unknown";
  }

  export interface UserTracks {
    title: string;
    url: string;
    publishedAt: Date;
    genre: string;
    author: string;
    duration: number;
  }

  export interface UserLikes {
    title: string;
    url: string;
    publishedAt: Date;
    author: {
      name: string;
      username: string;
      profile: string;
    };
  }

  export interface UserInfo {
    urn: number;
    username: string;
    name: string;
    verified: boolean;
    createdAt: Date;
    avatarURL: string | null;
    profile: string;
    bannerURL: string | null;
    followers: number;
    following: number;
    likesCount: number;
    tracksCount: number;
    tracks: UserTracks[];
    likes: UserLikes[];
  }
}
