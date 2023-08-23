export class Slug {
  public value: string

  contructor(value: string) {
    this.value = value
  }
  
  /**
   * Receives a string and normalizes it as a slug
   * 
   * Example: "An example title" => "an-examples-title"
   * 
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '');

    return new Slug(slugText)
  }
 }