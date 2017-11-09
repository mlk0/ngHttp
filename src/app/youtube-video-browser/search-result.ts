export class YouTubeSearchResult {
  
    public id: string;
    public title: string;
    public description: string;
    public thumbnailUrl: string;
    public videoUrl: string

    constructor(obj? : any) { 
        this.id = obj && obj.id || null; 
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && `https://www.youtube.com/watch?v=${this.id}` || null;
    }


}
