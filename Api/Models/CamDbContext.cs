using Microsoft.EntityFrameworkCore;

namespace Api.Models;

public partial class CamDbContext : DbContext
{
    public CamDbContext()
    {
    }

    public CamDbContext(DbContextOptions<CamDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TemplateField> TemplateFields { get; set; }

    public virtual DbSet<TemplatePanel> TemplatePanels { get; set; }

    public virtual DbSet<TemplateParent> TemplateParents { get; set; }

    public virtual DbSet<TemplateSection> TemplateSections { get; set; }

    public virtual DbSet<TemplateType> TemplateTypes { get; set; }

    public virtual DbSet<TemplateVersion> TemplateVersions { get; set; }

    public virtual DbSet<TemplateSurvey> TemplateSurveys { get; set; }
    
    public virtual DbSet<TemplateSurveyResponse> TemplateSurveyResponses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=Vijay\\SQLExpress;Database=CAM;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TemplateSurveyResponse>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC071D8C0815");

            entity.ToTable("S_TemplateSurveyResponse");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0681E4AF6A").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateSurvey).WithMany(p => p.TemplateSurveyResponses)
                .HasForeignKey(d => d.TemplateSurveyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateSurveyResponse_S_TemplateSurvey_Id");

                entity.HasOne(d => d.TemplateField).WithMany(p => p.TemplateSurveyResponses)
                .HasForeignKey(d => d.TemplateFieldId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateSurveyResponse_S_TemplateField_Id");
        });

        modelBuilder.Entity<TemplateSurvey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC071D8C0815");

            entity.ToTable("S_TemplateSurvey");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0681E4AF5A").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateVersion).WithMany(p => p.TemplateSurveys)
                .HasForeignKey(d => d.TemplateVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateSurvey_TemplateVersion_Id");
        });

        modelBuilder.Entity<TemplateField>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC071D8C0814");

            entity.ToTable("S_TemplateField");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0681E4AF4A").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateSection).WithMany(p => p.TemplateFields)
                .HasForeignKey(d => d.TemplateSectionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateField_TemplateSection_Id");
        });

        modelBuilder.Entity<TemplateParent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC0704E517DF");

            entity.ToTable("S_TemplateParent");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC063F92DBA2").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateType).WithMany(p => p.TemplateParents)
                .HasForeignKey(d => d.TemplateTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateParent_TemplateType_Id");
        });

        modelBuilder.Entity<TemplateVersion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC07EEF363F8");

            entity.ToTable("S_TemplateVersion");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC0657B443E4").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.PublishedUtcDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.Template).WithMany(p => p.TemplateVersions)
                .HasForeignKey(d => d.TemplateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateVersion_TemplateParent_Id");
        });

        modelBuilder.Entity<TemplatePanel>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC0722A272C8");

            entity.ToTable("S_TemplatePanel");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06AE77ED7F").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplateVersion).WithMany(p => p.TemplatePanels)
                .HasForeignKey(d => d.TemplateVersionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplatePanel_TemplateVersion_Id");
        });

        modelBuilder.Entity<TemplateSection>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC076B7CFECD");

            entity.ToTable("S_TemplateSection");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06EC42579C").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.Ctheader).HasColumnName("CTHeader");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");

            entity.HasOne(d => d.TemplatePanel).WithMany(p => p.TemplateSections)
                .HasForeignKey(d => d.TemplatePanelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_S_TemplateSection_TemplatePanel_Id");
        });

        modelBuilder.Entity<TemplateType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Template__3214EC07D0EF520E");

            entity.ToTable("S_TemplateType");

            entity.HasIndex(e => e.Id, "UQ__Template__3214EC06E726953F").IsUnique();

            entity.Property(e => e.CreatedUTCDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedUTCDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
