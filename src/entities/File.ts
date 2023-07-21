export class FileEntity {
  readonly id: string;
  file: string;
  filePath: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id?: string;
    file?: string;
    filePath?: string;
    size?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    (this.id = props.id ?? crypto.randomUUID()),
      (this.file = props.file),
      (this.filePath = props.filePath),
      (this.size = props.size),
      (this.createdAt = props.createdAt ?? new Date()),
      (this.updatedAt = props.updatedAt ?? new Date());
  }
}
