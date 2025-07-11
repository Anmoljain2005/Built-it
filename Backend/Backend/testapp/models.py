from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class TestModel(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Election(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_elections')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    display_results = models.BooleanField(default=False)  # Can hide results if needed
    display_election = models.BooleanField(default=True) # Can hide election if too old

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.title


class Position(models.Model):
    BATCH_SELECTION_CHOICES = [
        ('All Batches', 'All Batches'),
        ('1st Year', '1st Year'),
        ('2nd Year', '2nd Year'),
        ('3rd Year', '3rd Year'),
        ('4th Year', '4th Year'),
    ]

    BRANCH_SELECTION_CHOICES = [
        ('All Branches', 'All Branches'),
        ('CSE', 'CSE'),
        ('EE', 'EE'),
        ('MECH', 'MECH'),
        ('CIVIL', 'CIVIL'),
        ('MEMS', 'MEMS'),
        ('CHE', 'CHE'),
        ('EP', 'EP'),
        ('SSE', 'SSE'),
        ('MC', 'MC'), 
       
    ]
    DEGREE_SELECTION_CHOICES = [
        ('B.Tech', 'B.Tech'),
        ('MTech', 'MTech'),
        ('MSC', 'MSC'),
        ('PHD', 'PHD'),
    ]
    
        # chemiscla mtech phd
    election = models.ForeignKey(Election, on_delete=models.CASCADE, related_name='positions')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
      # ✅ Store multiple batch restrictions as JSON or ArrayField
    batch_restriction = models.JSONField(
        default=list,  # Defaults to allowing all
        help_text="List of eligible batches that can vote."
    )

    # ✅ Store multiple Department restrictions as JSON or ArrayField
    branch_restriction = models.JSONField(
        default=list,  # Defaults to allowing all
        help_text="List of eligible departments that can vote."
    )
    # Store multiple degree restrictions as JSONField
    degree_restriction = models.JSONField(
        default=list,
        help_text="List of eligible degrees that can vote."
    )

    class Meta:
        ordering = ['title']

    def __str__(self):
        return f"{self.title} - {self.election.title}"


class Candidate(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE, related_name='candidates')
    name = models.CharField(max_length=255, blank=True, null=True)
    roll_no = models.CharField(max_length=50, default="Unknown Roll No")  # ✅ Default roll number
    degree = models.CharField(
        max_length=10,
        choices=[("BTech", "BTech"), ("MTech", "MTech"), ("PHD", "PHD"), ("MSC", "MSC")],
        default="BTech"
    )  # ✅ Added degree field with choices
    Department = models.CharField(max_length=100, default="CSE")  # ✅ Department-based elections
    photo = models.ImageField(upload_to='candidates/', blank=True, null=True)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['position', 'name']

    def __str__(self):
        return f"{self.name } - {self.position.title}"




class Vote(models.Model):
    voter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='votes')
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['voter', 'candidate']

    def __str__(self):
        """Return a string with the voter's username, candidate name, and election title."""
        election_name = self.candidate.position.election.title  # ✅ Get election name
        return f"{self.voter.username} voted for {self.candidate.name} in {election_name}"
    def get_election(self):
        """Fetch the election for this vote via Candidate -> Position -> Election."""
        return self.candidate.position.election


class VoterFile(models.Model):
    file = models.FileField(upload_to="voter_files/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    election = models.ForeignKey(
    Election,
    on_delete=models.CASCADE,
    related_name="voter_files",
    help_text="The election this voter file is associated with.",
    null=True,
    blank=True
)
    def __str__(self):
        if self.election:
            return f"Voter File for {self.election.title} uploaded at {self.uploaded_at}"
        return f"Voter File uploaded at {self.uploaded_at}"